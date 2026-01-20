import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Pages/Dashboard";
import Products from "./Admin/Pages/Products";
import Categories from "./Admin/Pages/Categories";
import Orders from "./Admin/Pages/Orders";
import Customers from "./Admin/Pages/Customers";
import Offers from "./Admin/Pages/Offers";
import Inventory from "./Admin/Pages/Inventory";
import Banners from "./Admin/Pages/Banners";
import Reports from "./Admin/Pages/Reports";
import Settings from "./Admin/Pages/Settings";
import AdminProvider from "./context/AdminContext";

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/offers" element={<Offers />} />
            <Route path="/admin/inventory" element={<Inventory />} />
            <Route path="/admin/banners" element={<Banners />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
