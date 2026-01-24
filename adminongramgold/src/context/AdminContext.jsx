import { createContext, useContext, useEffect, useState, useCallback } from "react";

/* =====================================================
   CONTEXT
===================================================== */
const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

const API_URL = "http://localhost:5000/api";

/* =====================================================
   PROVIDER
===================================================== */
const AdminProvider = ({ children }) => {
  /* ================= TOKEN ================= */
  const getToken = () => localStorage.getItem("token");

  /* =====================================================
     PRODUCTS
  ===================================================== */
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const fetchProducts = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      setLoadingProducts(true);

      const res = await fetch(`${API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      // ✅ Map products to ensure all fields exist
      const formatted = data.map((p) => ({
        id: p.id,
        name: p.name || "Unnamed Product",
        category: p.category || "Uncategorized",
        price: Number(p.price) || 0,
        oldPrice: p.old_price ? Number(p.old_price) : null,
        stock: Number(p.stock) || 0,
        status: p.status || (p.stock > 0 ? "Active" : "Inactive"),
        image: p.image || "https://via.placeholder.com/120",
      }));

      setProducts(formatted);
    } catch (err) {
      console.error("Fetch products error:", err);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  /* =====================================================
     BANNERS
  ===================================================== */
  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(false);

  const fetchBanners = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      setLoadingBanners(true);

      const res = await fetch(`${API_URL}/banners`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch banners");

      const data = await res.json();
      setBanners(data);
    } catch (err) {
      console.error("Fetch banners error:", err);
    } finally {
      setLoadingBanners(false);
    }
  }, []);

  /* =====================================================
     ORDERS (ADMIN ONLY)
  ===================================================== */
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const fetchOrders = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      setLoadingOrders(true);

      const res = await fetch(`${API_URL}/orders/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();

      // Map orders for consistent frontend structure
      const formatted = data.map((o) => ({
        id: o.id,
        customer: o.customer_name || "Guest",
        phone: o.phone || "-",
        address: o.address || "-",
        grams: o.grams || 0,
        total: o.total_amount || 0,
        status: o.status || "Pending",
        createdAt: o.created_at || new Date().toISOString(),
      }));

      setOrders(formatted);
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  /* =====================================================
     INITIAL LOAD
  ===================================================== */
  useEffect(() => {
    fetchProducts();
    fetchBanners();
    fetchOrders();
  }, [fetchProducts, fetchBanners, fetchOrders]);

  /* =====================================================
     CONTEXT VALUE
  ===================================================== */
  return (
    <AdminContext.Provider
      value={{
        /* PRODUCTS */
        products,
        loadingProducts,
        fetchProducts,
        setProducts,

        /* BANNERS */
        banners,
        loadingBanners,
        fetchBanners,
        setBanners,

        /* ORDERS */
        orders,
        loadingOrders,
        fetchOrders,
        setOrders,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
