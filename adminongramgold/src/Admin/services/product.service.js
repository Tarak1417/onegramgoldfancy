import axios from "axios";

/**
 * Change BASE_URL if needed
 * Example:
 * http://localhost:5000/api/products
 */
const BASE_URL = "http://localhost:5000/api/products";

// -------------------- GET ALL PRODUCTS --------------------
export const getAllProducts = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

// -------------------- GET SINGLE PRODUCT --------------------
export const getProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

// -------------------- ADD PRODUCT --------------------
export const addProductAPI = async (productData) => {
  const res = await axios.post(BASE_URL, {
    name: productData.name,
    category: productData.category,
    price: Number(productData.price),
    oldPrice: productData.oldPrice ? Number(productData.oldPrice) : null,
    stock: Number(productData.stock),
    status: Number(productData.stock) > 0 ? "Active" : "Inactive",
    image: "https://via.placeholder.com/100",
  });

  return res.data;
};






// -------------------- UPDATE PRODUCT --------------------
export const updateProductAPI = async (id, productData) => {
  const res = await axios.put(`${BASE_URL}/${id}`, productData);
  return res.data;
};

// -------------------- DELETE PRODUCT --------------------
export const deleteProductAPI = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};

// -------------------- TOGGLE PRODUCT STATUS --------------------
export const toggleProductStatusAPI = async (id, status) => {
  const res = await axios.put(`${BASE_URL}/${id}`, { status });
  return res.data;
};
