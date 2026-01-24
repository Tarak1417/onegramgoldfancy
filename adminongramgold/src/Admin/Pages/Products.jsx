import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  addProductAPI,
  updateProductAPI,
  deleteProductAPI,
  toggleProductStatusAPI,
} from "../services/product.service";
import { Pencil, Trash2 } from "lucide-react";

/* -------------------- PRODUCTS PAGE -------------------- */
const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    stock: "",
    imageFile: null,
  });

  /* ---------------- FETCH PRODUCTS ---------------- */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();

      const formatted = data.map((p) => {
        const priceNum = Number(p.price) || 0;
        const oldPriceNum = p.old_price ? Number(p.old_price) : priceNum;
        const hasDiscount = oldPriceNum > priceNum;
        const discount = hasDiscount
          ? Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100)
          : 0;

        return {
          id: p.id,
          name: p.name || "Unnamed Product",
          category: p.category || "Uncategorized",
          price: priceNum,
          oldPrice: oldPriceNum !== priceNum ? oldPriceNum : null,
          discount,
          stock: Number(p.stock) || 0,
          status: p.status || (p.stock > 6 ? "Active" : "Inactive"),
          image: p.image_url || "https://via.placeholder.com/120",
        };
      });

      setProducts(formatted);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ---------------- FORM HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "imageFile" ? files[0] : value,
    }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      oldPrice: "",
      stock: "",
      imageFile: null,
    });
    setEditingId(null);
  };

  /* ---------------- ADD / UPDATE ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = form.imageFile
      ? URL.createObjectURL(form.imageFile)
      : "https://via.placeholder.com/120";

    const priceNum = Number(form.price) || 0;
    const oldPriceNum = form.oldPrice ? Number(form.oldPrice) : priceNum;
    const discount =
      oldPriceNum > priceNum
        ? Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100)
        : 0;

    const payload = {
      name: form.name,
      category: form.category || "Uncategorized",
      price: priceNum,
      old_price: oldPriceNum !== priceNum ? oldPriceNum : null,
      discount,
      stock: Number(form.stock) || 0,
      status: Number(form.stock) > 0 ? "Active" : "Inactive",
      image_url: imageUrl,
    };

    try {
      if (editingId) {
        await updateProductAPI(editingId, payload);
      } else {
        await addProductAPI(payload);
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  /* ---------------- ACTIONS ---------------- */
  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice || "",
      stock: product.stock,
      imageFile: null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProductAPI(id);
    fetchProducts();
  };

  const toggleStock = async (product) => {
    const newStatus = product.status === "Active" ? "Inactive" : "Active";
    try {
      await toggleProductStatusAPI(product.id, newStatus);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, status: newStatus } : p
        )
      );
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Products</h2>

      {/* ADD / EDIT FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border p-6 space-y-4"
      >
        <h3 className="text-lg font-semibold">
          {editingId ? "Edit Product" : "Add Product"}
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Selling Price"
            value={form.price}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />

          <input
            type="number"
            name="oldPrice"
            placeholder="Old Price (optional)"
            value={form.oldPrice}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />

          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 border rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* PRODUCT TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">
        {loading ? (
          <p className="p-6">Loading...</p>
        ) : (
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Old Price</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={product.image}
                      className="w-14 h-14 rounded border object-cover"
                      alt={product.name}
                    />
                    <p className="font-medium">{product.name}</p>
                  </td>

                  <td className="px-4 py-3 capitalize">{product.category}</td>
                  <td className="px-4 py-3 font-semibold">₹{product.price}</td>
                  <td className="px-4 py-3 text-gray-400 line-through">
                    {product.oldPrice ? `₹${product.oldPrice}` : "-"}
                  </td>
                  <td className="px-4 py-3 text-green-600 font-semibold">
                    {product.discount > 0 ? `${product.discount}% OFF` : "-"}
                  </td>

                  <td className="px-4 py-3">{product.stock}</td>

                  <td className="px-4 py-3">
                    <label className="relative inline-flex cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={product.status === "Active"}
                        onChange={() => toggleStock(product)}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full"></div>
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></span>
                    </label>
                  </td>

                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-indigo-600"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;
