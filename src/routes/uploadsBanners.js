const express = require("express");
const multer = require("multer");
const imageUploadController = require("../controllers/adminApiController");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/images/horizontalBanners')
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_product_${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage });

/* /api/upload */
router.post("/upload-images", upload.array("images", 3), imageUploadController.uploadBannerImages);


module.exports = router;