import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import api from "../api/axios";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(AppContext);

  const navigate = useNavigate();

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const [guest, setGuest] = useState({
    name: "",
    phone: "",
    address: "",
  });

  /* ---------------- LOAD SAVED ADDRESS ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("deliveryAddress");
    if (saved) {
      setGuest(JSON.parse(saved));
    }
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ---------------- PLACE ORDER ---------------- */
  const confirmOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }

    if (!guest.name || !guest.phone || !guest.address) {
      toast.error("Please fill delivery details");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    localStorage.setItem("deliveryAddress", JSON.stringify(guest));

    const orderPayload = {
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        qty: item.quantity,
      })),
      totalAmount: subtotal,
      customer_name: guest.name,
      phone: guest.phone,
      address: guest.address,
    };

    try {
      await api.post("/orders", orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Order placed successfully 🎉");
      clearCart();
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      toast.error("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <Navbar />

      <div className="pt-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        {/* CART ITEMS */}
        <div className="flex-1">
          <h1 className="text-3xl font-medium mb-6">
            Shopping Cart{" "}
            <span className="text-sm text-indigo-500">
              {cart.length} Items
            </span>
          </h1>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    className="w-24 h-24 object-cover border rounded"
                    alt={item.name}
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      Qty:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            Math.max(1, +e.target.value)
                          )
                        }
                        className="w-14 border px-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-medium">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="w-full max-w-sm bg-gray-100 p-5 border">
          <h2 className="text-xl font-medium">Order Summary</h2>

          <p className="mt-4 text-sm font-medium">Delivery Address</p>

          {!guest.address || isEditingAddress ? (
            <div className="space-y-2 mt-2">
              <input
                placeholder="Name"
                value={guest.name}
                onChange={(e) =>
                  setGuest({ ...guest, name: e.target.value })
                }
                className="w-full border px-3 py-2"
              />
              <input
                placeholder="Phone"
                value={guest.phone}
                onChange={(e) =>
                  setGuest({ ...guest, phone: e.target.value })
                }
                className="w-full border px-3 py-2"
              />
              <textarea
                placeholder="Address"
                value={guest.address}
                onChange={(e) =>
                  setGuest({ ...guest, address: e.target.value })
                }
                className="w-full border px-3 py-2"
              />
              {guest.address && (
                <button
                  onClick={() => setIsEditingAddress(false)}
                  className="text-indigo-500 text-sm"
                >
                  Save Address
                </button>
              )}
            </div>
          ) : (
            <div className="mt-2">
              <p className="text-gray-600">{guest.address}</p>
              <button
                onClick={() => setIsEditingAddress(true)}
                className="text-indigo-500 text-sm"
              >
                Change
              </button>
            </div>
          )}

          <hr className="my-4" />

          <p className="flex justify-between font-medium">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </p>

          <button
            onClick={confirmOrder}
            disabled={loading}
            className={`w-full mt-6 py-3 text-white
              ${loading ? "bg-gray-400" : "bg-indigo-500 hover:bg-indigo-600"}
            `}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
