var express = require('express');
const multer = require('multer');
const { showListUsers, showListProducts, createProduct, deleteProduct, getEditProduct, saveEditProduct, editProductPrice } = require('../controllers/adminApiController');
var router = express.Router();

const upload = multer({ dest: './public/uploads/' })

/* /api/admin */
router
    .get('/users', showListUsers)
    .get('/products', showListProducts)
    .post('/create', upload.array('imageFiles', 3), createProduct)
    .put('/edit/product-prices',editProductPrice)
    .delete('/:id', deleteProduct)
    .get('/edit/:id', getEditProduct)
    .put('/edit/:id', saveEditProduct)

module.exports = router;
