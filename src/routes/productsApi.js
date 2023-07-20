const express = require('express')
const { productDetail, searchProduct, searchByCategory, searchByBrand, searchByOffer, allBrands, allCategories } = require('../controllers/productApiController')
const router = express.Router()

/* '/api/products' */
router
    .get('/search', searchProduct) // http://localhost:3000/api/products/search?keyword=aspiradora
    .get('/category/:id', searchByCategory) // http://localhost:3000/api/products/category/1
    .get('/brand/:id', searchByBrand) // http://localhost:3000/api/products/brand/1
    .get('/offer', searchByOffer) // http://localhost:3000/api/products/offer
    .get('/brands', allBrands) // http://localhost:3000/api/products/brands
    .get('/categories', allCategories) // http://localhost:3000/api/products/categories
    .get('/:id', productDetail) // http://localhost:3000/api/products/1

module.exports = router;