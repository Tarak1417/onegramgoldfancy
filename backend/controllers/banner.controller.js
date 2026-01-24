const pool = require("../config/db");

// GET all banners
exports.getBanners = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM banners ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ADD banner ✅ FINAL FIX
exports.addBanner = async (req, res) => {
  try {
    const { title, paragraph, button_text } = req.body;

    if (!title || !paragraph || !button_text || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔥 FIX: use `image` (not image_url)
    const image = `/uploads/${req.file.filename}`;

    const result = await pool.query(
      `INSERT INTO banners (title, paragraph, button_text, image, status)
       VALUES ($1,$2,$3,$4,'Active')
       RETURNING *`,
      [title, paragraph, button_text, image]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("DB ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE status
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await pool.query(
      "SELECT status FROM banners WHERE id=$1",
      [id]
    );

    const newStatus =
      banner.rows[0].status === "Active" ? "Inactive" : "Active";

    const result = await pool.query(
      "UPDATE banners SET status=$1 WHERE id=$2 RETURNING *",
      [newStatus, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE banner
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM banners WHERE id=$1", [id]);
    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
