const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary");

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    const image_url = req.file ? req.file.path : null;

    const product = await Product.createProduct({
      name,
      description,
      price,
      stock,
      image_url
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
    const { name, description, price, stock } = req.body;

    // Build update object
    const data = { name, description, price, stock };

    // If new image uploaded, upload to Cloudinary
    if (req.file) {
      // Optional: Delete old image from Cloudinary here if needed
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
    // Fetch product to get image_url
    const product = await Product.getProductById(req.params.id);

    if (product && product.image_url) {
      // Extract public_id from Cloudinary URL
      const segments = product.image_url.split("/");
      const public_id_with_ext = segments[segments.length - 1];
      const public_id = public_id_with_ext.split(".")[0];

      // Delete from Cloudinary
      await cloudinary.uploader.destroy(`products/${public_id}`);
    }

    await Product.deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

