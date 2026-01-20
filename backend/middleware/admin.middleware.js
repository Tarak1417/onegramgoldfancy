const adminAuth = (req, res, next) => {
  // TEMP (later replace with JWT)
  const isAdmin = true;

  if (!isAdmin) {
    return res.status(403).json({ message: "Admin access denied" });
  }

  next();
};

module.exports = adminAuth;
