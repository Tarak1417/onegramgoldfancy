import React from "react";

const fallbackImage =
  "https://via.placeholder.com/300x300?text=One+Gram+Gold";

const ProductCard = ({ product }) => {
  
  if (!product) return null;

  return (
    <div
      className="
        bg-white rounded-xl shadow-sm
        hover:shadow-md transition
        overflow-hidden
        min-w-[160px] sm:min-w-[200px]
      "
    >
     
      <div className="relative h-40 sm:h-48 bg-gray-100">
        <img
          src={product.image || fallbackImage}
          alt={product.name || "Jewellery"}
          className="w-full h-full object-cover"
        />
      </div>

     
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.name || "One Gram Gold Jewellery"}
        </h3>

        {product.price && (
          <p className="mt-1 text-yellow-500 font-semibold text-sm">
            ₹ {product.price}
          </p>
        )}

        <button
          className="
            mt-3 w-full py-1.5
            rounded-full
            bg-black text-white
            text-xs font-semibold
            hover:bg-gray-800 transition
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
