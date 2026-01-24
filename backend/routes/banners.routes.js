const express = require("express");
const router = express.Router();
const multer = require("multer");
const BannerController = require("../controllers/banner.controller");

// Multer setup (LOCAL STORAGE)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.get("/", BannerController.getBanners);
router.post("/", upload.single("image"), BannerController.addBanner);
router.put("/:id", BannerController.updateBanner);
router.delete("/:id", BannerController.deleteBanner);

module.exports = router;
