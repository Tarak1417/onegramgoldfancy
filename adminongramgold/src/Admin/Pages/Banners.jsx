import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";

const Banners = () => {
  const { banners, addBanner, toggleBannerStatus, deleteBanner } = useAdmin();

  const [form, setForm] = useState({
    title: "",
    paragraph: "",
    buttonText: "",
    imageFile: null,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    setForm({ ...form, imageFile: e.target.files[0] });
  };

  // Add new banner
  const handleAddBanner = (e) => {
    e.preventDefault();
    if (!form.title || !form.paragraph || !form.buttonText || !form.imageFile) {
      alert("Please fill all fields and select an image!");
      return;
    }
    addBanner({
      title: form.title,
      paragraph: form.paragraph,
      buttonText: form.buttonText,
      imageFile: form.imageFile,
    });
    setForm({ title: "", paragraph: "", buttonText: "", imageFile: null });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Banners</h2>

      {/* Add Banner Form */}
      <form
        onSubmit={handleAddBanner}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <h3 className="text-lg font-semibold">Add New Banner</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Banner Title / Heading"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="paragraph"
            placeholder="Banner Paragraph / Description"
            value={form.paragraph}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="buttonText"
            placeholder="Button Text"
            value={form.buttonText}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Banner
        </button>
      </form>

      {/* Banners List */}
      <div className="space-y-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded shadow gap-4"
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="h-24 w-64 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{banner.title}</h3>
              <p className="text-gray-600">{banner.paragraph}</p>
              {banner.buttonText && (
                <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
                  {banner.buttonText}
                </button>
              )}
            </div>
            <span
              className={`px-2 py-1 rounded font-semibold ${
                banner.status === "Active"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {banner.status}
            </span>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded"
                onClick={() => toggleBannerStatus(banner.id)}
              >
                Toggle Status
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => deleteBanner(banner.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banners;
