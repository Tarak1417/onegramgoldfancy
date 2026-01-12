const Order = require("../models/order.model");

exports.createOrder = async (req, res) => {
  const { grams, price_per_gram } = req.body;
  try {
    const order = await Order.createOrder(req.user.id, grams, price_per_gram);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.getUserOrders(req.user.id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
