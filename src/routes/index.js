const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/store/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/product/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/get-code', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/purchase-accepted', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/purchase-denied', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

// Rutas protegidas
router.get('/signIn', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/profile/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/finish-buying', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

// Rutas de admin protegidas
router.get('/dashboard/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/dashboard/search/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/dashboard/users', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/dashboard/products', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/dashboard/filterProducts/:category', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/dashboard/edit-price', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/dashboard/edit-price-by-category', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/dashboard/products/create', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/dashboard/products/edit/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/dashboard/delete-product/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/dashboard/dinamic-carousel', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

router.get('/dashboard/static-banners', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

module.exports = router;