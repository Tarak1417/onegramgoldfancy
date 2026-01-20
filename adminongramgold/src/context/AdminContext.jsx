// src/context/AdminContext.jsx
import { createContext, useContext, useState } from "react";

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

const AdminProvider = ({ children }) => {
  //  Products code here 
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Gold Chain",
      category: "Chains",
      price: 2500,
      oldPrice: 3000,
      discount: 17,
      stock: 10,
      status: "Active",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Panchalohalu Haram",
      category: "Harams",
      price: 4800,
      oldPrice: 5500,
      discount: 13,
      stock: 0,
      status: "Inactive",
      image: "https://via.placeholder.com/100",
    },
  ]);

  // Add product with local image file support
  const addProduct = ({ name, category, price, oldPrice, stock, imageFile }) => {
    const id = products.length + 1;
    const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
    const image = imageFile ? URL.createObjectURL(imageFile) : "https://via.placeholder.com/100";

    setProducts((prev) => [
      ...prev,
      {
        id,
        name,
        category,
        price: Number(price),
        oldPrice: oldPrice ? Number(oldPrice) : null,
        discount,
        stock: Number(stock),
        status: Number(stock) > 0 ? "Active" : "Inactive",
        image,
      },
    ]);
  };

  // Toggle product stock status
  const toggleProductStock = (id) =>
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );

  // Delete product
  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  // -------------------- CATEGORIES --------------------
  const [categories, setCategories] = useState(["Chains", "Harams", "Rings", "Bangles"]);
  const addCategory = (name) => setCategories((prev) => [...prev, name]);
  const deleteCategory = (name) => setCategories((prev) => prev.filter((c) => c !== name));

  // -------------------- ORDERS --------------------
  const [orders, setOrders] = useState([
    { id: 101, customer: "Ravi", total: 2500, status: "New" },
    { id: 102, customer: "Sita", total: 4800, status: "Shipped" },
  ]);
  const updateOrderStatus = (id, status) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  // -------------------- CUSTOMERS --------------------
  const [customers] = useState([
    { id: 1, name: "Ravi", phone: "9999999999" },
    { id: 2, name: "Sita", phone: "8888888888" },
  ]);

  // -------------------- OFFERS --------------------
  const [offers, setOffers] = useState([{ id: 1, title: "10% Festival Offer" }]);
  const addOffer = (offer) => setOffers((prev) => [...prev, offer]);
  const deleteOffer = (id) => setOffers((prev) => prev.filter((o) => o.id !== id));

  // -------------------- BANNERS --------------------
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Diwali Sale Banner",
      image: "https://via.placeholder.com/400x150?text=Diwali+Sale",
      status: "Active",
    },
    {
      id: 2,
      title: "Summer Offer",
      image: "https://via.placeholder.com/400x150?text=Summer+Offer",
      status: "Inactive",
    },
  ]);

  // Add banner with local image file
  const addBanner = ({ title, imageFile }) => {
    const id = banners.length + 1;
    const image = imageFile ? URL.createObjectURL(imageFile) : "https://via.placeholder.com/400x150";
    setBanners((prev) => [...prev, { id, title, image, status: "Active" }]);
  };

  // Toggle banner status
  const toggleBannerStatus = (id) =>
    setBanners((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: b.status === "Active" ? "Inactive" : "Active" } : b
      )
    );

  // Delete banner
  const deleteBanner = (id) => setBanners((prev) => prev.filter((b) => b.id !== id));

  return (
    <AdminContext.Provider
      value={{
        // Products
        products,
        addProduct,
        toggleProductStock,
        deleteProduct,
        // Categories
        categories,
        addCategory,
        deleteCategory,
        // Orders
        orders,
        updateOrderStatus,
        // Customers
        customers,
        // Offers
        offers,
        addOffer,
        deleteOffer,
        // Banners
        banners,
        addBanner,
        toggleBannerStatus,
        deleteBanner,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
