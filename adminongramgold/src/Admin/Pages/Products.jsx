// src/Admin/Pages/Products.jsx
import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";

// Product Card Component
const ProductCard = ({ product, toggleStock }) => (
  <div className="bg-white rounded shadow p-4 flex flex-col sm:flex-row items-center gap-4">
    <img
      src={product.image}
      alt={product.name}
      className="w-24 h-24 object-cover rounded"
    />
    <div className="flex-1">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p>
        <span className="text-yellow-600 font-bold mr-2">₹{product.price}</span>
        {product.oldPrice && (
          <span className="line-through text-gray-400">₹{product.oldPrice}</span>
        )}
      </p>
      {product.discount && (
        <p className="text-green-600 text-sm">{product.discount}% Off</p>
      )}
      <p className="text-sm text-gray-500">Category: {product.category}</p>
    </div>
    <div className="flex flex-col items-center gap-2">
      <span
        className={`px-2 py-1 rounded text-sm font-semibold ${
          product.status === "Active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
        }`}
      >
        {product.status === "Active" ? "In Stock" : "Out of Stock"}
      </span>
      <button
        className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
        onClick={() => toggleStock(product.id)}
      >
        Toggle Stock
      </button>
    </div>
  </div>
);

// Products Page
const Products = () => {
  const { products, addProduct, toggleProductStock } = useAdmin();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    stock: "",
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setForm({ ...form, imageFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct(form);
    setForm({ name: "", category: "", price: "", oldPrice: "", stock: "", imageFile: null });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Products</h2>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="text-lg font-semibold">Add New Product</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="oldPrice"
            placeholder="Old Price (optional)"
            value={form.oldPrice}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={form.stock}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            toggleStock={toggleProductStock}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
