const express = require('express')
const { productDetail, searchProduct, searchByCategory, searchByBrand, searchByOffer, allBrands, allCategories, getLastProduct } = require('../controllers/productApiController')
const router = express.Router()

/* '/api/products' */
router
.get('/search', searchProduct) 
.get('/category/:id', searchByCategory) 
.get('/brand/:id', searchByBrand) 
.get('/offer', searchByOffer) 
.get('/brands', allBrands) 
.get('/categories', allCategories)
.get('/getLastProduct',getLastProduct)
.get('/:id', productDetail)

module.exports = router;