import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Category from "../Pages/CategoryChips";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Panchalohalu = () => {
  const { products } = useContext(AppContext);
  const navigate = useNavigate();

  const panchalohaluProducts = products?.panchalohalu || [];

  return (
    <>
      {/* Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
      `}</style>

      <Navbar />

      <div className="pt-24 px-6 bg-[#FAFAFA] min-h-screen font-poppins">

        <Category />

        {/* Heading */}
        <h1 className="text-3xl font-medium text-slate-800 text-center mb-2">
          Panchalohalu Collection
        </h1>
        <p className="text-slate-600 text-center mb-10">
          Divine metals · Temple craftsmanship
        </p>

        {/* Grid */}
        <section className="flex flex-wrap items-center justify-center gap-6">
          {panchalohaluProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group w-56 cursor-pointer"
            >
              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="
                  rounded-lg w-full h-72 object-cover
                  group-hover:shadow-xl
                  group-hover:-translate-y-1
                  transition-all duration-300
                "
              />

              {/* Name */}
              <p className="text-sm mt-2 font-medium text-slate-800">
                {product.name}
              </p>

              {/* Description */}
              <p className="text-xs text-slate-500 line-clamp-2">
                {product.description || "Premium Panchalohalu handcrafted idol"}
              </p>

              {/* Price */}
              <p className="text-xl font-semibold text-[#B08A2E] mt-1">
                ₹{product.price}
              </p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default Panchalohalu;
