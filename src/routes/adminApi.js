var express = require('express');
const { showListUsers, showListProducts, createProduct, deleteProduct } = require('../controllers/adminApiController');
var router = express.Router();


/* /api/admin */
router
.get('/users',showListUsers)
.get('/products',showListProducts)
.post('/create',createProduct)
.delete('/:id',deleteProduct)

module.exports = router;
