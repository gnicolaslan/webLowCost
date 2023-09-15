const express = require('express');
const mercadopago = require('mercadopago');
require('dotenv').config()


module.exports = {

    createPreference: async (req, res) => {
        mercadopago.configure({
            access_token: "TEST-2938245235269496-091414-6edd5c1f1294b94467a89c6b720d2d7f-1479550679"
        });

        const { description, price, quantity } = req.body;

        try {
            const result = await mercadopago.preferences.create({
                items: [
                    {
                        title: description,
                        unit_price: Number(price),
                        quantity: Number(quantity),
                        currency_id: "ARS"
                    }
                ],
                back_urls: {
                    "success": "http://127.0.0.1:5173/purchase-accepted",
                    "failure": "http://127.0.0.1:5173/purchase-denied",
                    "pending": "http://127.0.0.1:5173"
                },
                auto_return: "approved",
            });
            console.log(result)

            res.json(result.body)
        } catch (error) {
            return res.status(500).json({ message: 'Something goes wrong' })
        }
    },

    receiveWebhook: async (req, res) => {
        try {
            const payment = req.query
            console.log(payment)
            if (payment.type === 'payment') {
                const data = await mercadopago.payment.findById(payment["data.id"])
                console.log(data)
            }
            res.sendStatus(204)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Something goes wrong' })
        }
    }
}