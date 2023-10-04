var express = require("express");
const multer = require("multer");
const {
  showListUsers,
  showListProducts,
  createProduct,
  deleteProduct,
  getEditProduct,
  saveEditProduct,
  editProductPrice,
  editProductPriceByCategory,
  getAllBanners,
  getStaticBanners
} = require("../controllers/adminApiController");
var router = express.Router();

const upload = multer({ dest: "./public/uploads/" });

/* /api/admin */
router
  .put("/edit/product-prices-by-category", editProductPriceByCategory)
  .put("/edit/product-prices", editProductPrice)
  .get("/users", showListUsers)
  .get("/products", showListProducts)
  .post("/create", upload.array("imageFiles", 3), createProduct)
  .delete("/:id", deleteProduct)
  .put("/edit/:id", saveEditProduct)
  .get("/edit/:id", getEditProduct)
  .get("/horizontal-banners", getAllBanners)
  .get("/get-static-banners",getStaticBanners)

module.exports = router;
