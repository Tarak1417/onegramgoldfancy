import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Category from "../Pages/CategoryChips";
import { AppContext } from "../context/AppContext";
import { Heart } from "lucide-react";

const Panchalohalu = () => {
  const context = useContext(AppContext);

  // SAFETY CHECK
  if (!context || !context.products) {
    return <div className="pt-24 text-center">Loading...</div>;
  }

  const {
    products,
    addToCart,
    wishlist,
    toggleWishlist,
  } = context;

  const panchalohaluProducts = products?.panchalohalu || [];

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <Navbar />

      <div className="pt-[70px] px-4 max-w-7xl mx-auto">
        <Category />

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Panchalohalu Collection
        </h1>

        {panchalohaluProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products available
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {panchalohaluProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-44 w-full object-cover hover:scale-105 transition-transform duration-500"
                  />

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow"
                  >
                    <Heart
                      size={18}
                      className={
                        wishlist.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="p-3 space-y-2">
                  <h2 className="text-sm font-semibold text-gray-800 truncate">
                    {product.name}
                  </h2>

                  <p className="text-lg font-bold text-yellow-600">
                    ₹{product.price}
                  </p>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 py-2 text-xs rounded-xl border border-yellow-500 text-yellow-600 font-semibold hover:bg-yellow-50"
                    >
                      Add to Cart
                    </button>

                    <button className="flex-1 py-2 text-xs rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-600">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center text-sm text-gray-500">
          ✨ Authentic Panchalohalu · Premium Finish · Temple Certified
        </div>
      </div>
    </div>
  );
};

export default Panchalohalu;
