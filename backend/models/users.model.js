const pool = require("../config/db");

exports.findByEmail = async (email) => {
  const res = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  return res.rows[0];
};

exports.createUser = async ({ name, email, password, role }) => {
  const res = await pool.query(
    `INSERT INTO users (name,email,password,role)
     VALUES ($1,$2,$3,$4) RETURNING id,name,email,role`,
    [name, email, password, role]
  );
  return res.rows[0];
};
