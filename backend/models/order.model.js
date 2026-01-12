const pool = require("../config/db");

exports.createOrder = async (user_id, grams, price) => {
  const total = grams * price;
  const res = await pool.query(
    `INSERT INTO orders (user_id, grams, price_per_gram, total_amount)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [user_id, grams, price, total]
  );
  return res.rows[0];
};

exports.getUserOrders = async (user_id) => {
  const res = await pool.query("SELECT * FROM orders WHERE user_id=$1", [user_id]);
  return res.rows;
};

exports.getAllOrders = async () => {
  const res = await pool.query("SELECT * FROM orders");
  return res.rows;
};
