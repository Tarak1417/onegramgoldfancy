const express = require("express");
const router = express.Router();

// TEMP dummy data
let products = [
  {
    id: 1,
    name: "Gold Chain",
    price: 2500,
    oldPrice: 3000,
    stock: 10,
    status: "Active",
  },
];

// GET all products
router.get("/", (req, res) => {
  res.json(products);
});

// ADD product
router.post("/", (req, res) => {
  const product = {
    id: Date.now(),
    ...req.body,
    status: req.body.stock > 0 ? "Active" : "Inactive",
  };

  products.push(product);
  res.json({ message: "Product added", product });
});

// TOGGLE product status
router.put("/:id/status", (req, res) => {
  products = products.map((p) =>
    p.id == req.params.id
      ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
      : p
  );

  res.json({ message: "Status updated" });
});

// DELETE product
router.delete("/:id", (req, res) => {
  products = products.filter((p) => p.id != req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
