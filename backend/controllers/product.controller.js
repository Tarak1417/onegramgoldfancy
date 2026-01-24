const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary");

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, old_price, discount } = req.body;

    const image_url = req.file ? req.file.path : null;

    const product = await Product.createProduct({
      name,
      description,
      price,
      stock,
      image_url,
      category,
      old_price,
      discount,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, old_price, discount } = req.body;

    const data = { name, description, price, stock, category, old_price, discount };

    if (req.file) {
      data.image_url = req.file.path;
    }

    const product = await Product.updateProduct(req.params.id, data);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);

    if (product && product.image_url) {
      const segments = product.image_url.split("/");
      const public_id_with_ext = segments[segments.length - 1];
      const public_id = public_id_with_ext.split(".")[0];
      await cloudinary.uploader.destroy(`products/${public_id}`);
    }

    await Product.deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
