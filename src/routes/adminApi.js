var express = require('express');
const { showListUsers, showListProducts, createProduct, deleteProduct, getEditProduct, saveEditProduct } = require('../controllers/adminApiController');
var router = express.Router();


/* /api/admin */
router
    .get('/users', showListUsers)
    .get('/products', showListProducts)
    .post('/create', createProduct)
    .delete('/:id', deleteProduct)
    .get('/edit/:id', getEditProduct)
    .put('/edit/:id', saveEditProduct)

module.exports = router;
