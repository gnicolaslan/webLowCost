const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');
require('dotenv').config()

// Configurar MercadoPago 
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
});

// Ruta para crear preferencia /mp
router.post("/create_preference", (req, res) => {
    const { description, price, quantity } = req.body;

    let preference = {
        items: [
            {
                title: description,
                unit_price: Number(price),
                quantity: Number(quantity),
            }
        ],
        statement_descriptor: "Low Cost",
        binary_mode: true,
        back_urls: {
            "success": "http://127.0.0.1:5173/",
            "failure": "http://127.0.0.1:5173/",
            "pending": "/feedback"
        },
        auto_return: "approved",
    };

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id
            });
        }).catch(function (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = router;