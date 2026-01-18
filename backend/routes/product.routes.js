const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.post("/", productController.addProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getSingleProduct);
router.put("/:id", productController.editProduct);
router.delete("/:id", productController.removeProduct);

module.exports = router;
