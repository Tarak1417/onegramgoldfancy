// backend/routes/product.routes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", upload.single("image"), productController.addProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getSingleProduct);
router.put("/:id", upload.single("image"), productController.editProduct);
router.delete("/:id", productController.removeProduct);

module.exports = router;
