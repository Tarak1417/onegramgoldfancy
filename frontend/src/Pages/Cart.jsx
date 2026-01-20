import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../Components/Navbar";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cart, removeFromCart, updateQuantity } =
    useContext(AppContext);
        const navigate = useNavigate();
    

  const [promo, setPromo] = useState("");
  const DISCOUNT_RATE = promo === "GOLD10" ? 0.1 : 0;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = subtotal * DISCOUNT_RATE;
  const total = subtotal - discount;

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <Navbar />
      

      <div className="pt-20 px-4 max-w-5xl mx-auto">
         <div className="max-w-md mx-auto mb-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center  text-yellow-400 hover:text-yellow-500 transition"
        >
          {/* Back Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>
        
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">
            Your cart is empty
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {/* CART ITEMS */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white p-4 rounded-xl shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold">
                      {item.name}
                    </h2>
                    <p className="text-yellow-600 font-bold">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            Number(e.target.value)
                          )
                        }
                        className="w-16 border rounded px-2 py-1"
                      />

                      <button
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <p className="font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* PRICE SUMMARY */}
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
              <h2 className="font-bold text-lg">
                Price Details
              </h2>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              {/* PROMO CODE */}
              <input
                type="text"
                placeholder="Promo code (GOLD10)"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />

              <button className="w-full bg-yellow-500 py-3 rounded-xl font-semibold">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
