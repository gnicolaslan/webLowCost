var express = require('express');
const multer = require('multer');
const { showListUsers, showListProducts, createProduct, deleteProduct, getEditProduct, saveEditProduct, editProductPrice } = require('../controllers/adminApiController');
var router = express.Router();

const upload = multer({ dest: './public/uploads/' })

/* /api/admin */
router
    .put('/edit/product-prices', editProductPrice)
    .get('/users', showListUsers)
    .get('/products', showListProducts)
    .post('/create', upload.array('imageFiles', 3), createProduct)
    .delete('/:id', deleteProduct)
    .put('/edit/:id', saveEditProduct)
    .get('/edit/:id', getEditProduct)

module.exports = router;
