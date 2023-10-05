const express = require("express");
const multer = require("multer");
const {
  uploadBannerImages,
  deleteOldImages,
  uploadBannerImagesStatic,
  getAllBanners,
  getStaticBanners,
  deleteOldImagesStatic
} = require("../controllers/adminApiController");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const horizontalStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images/horizontalBanners");
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}_product_${path.extname(file.originalname)}`);
  },
});

const staticStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images/StaticBanners");
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}_product_${path.extname(file.originalname)}`);
  },
});

const horizontalUpload = multer({ storage: horizontalStorage });
const staticUpload = multer({ storage: staticStorage });

/* /api/upload */
router
  .post("/upload-images", horizontalUpload.array("images", 3), uploadBannerImages)
  .delete("/delete-images", deleteOldImages)
  .get("/horizontal-banners", getAllBanners)

  .post("/upload-banners-static", staticUpload.array("images", 3), uploadBannerImagesStatic)
  .delete("/delete-static-images", deleteOldImagesStatic)
  .get("/get-static-banners", getStaticBanners)

module.exports = router;
