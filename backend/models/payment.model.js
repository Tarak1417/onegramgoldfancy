const pool = require("../config/db");

exports.createPayment = async ({ order_id, gateway, payment_id, status, amount }) => {
  const res = await pool.query(
    `INSERT INTO payments (order_id, payment_gateway, payment_id, status, amount)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [order_id, gateway, payment_id, status, amount]
  );
  return res.rows[0];
};
