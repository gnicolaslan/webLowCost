// Configurar MercadoPago 
mercadopago.configure({
    access_token: "TEST-2938245235269496-091414-6edd5c1f1294b94467a89c6b720d2d7f-1479550679"
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
                currency_id: 'ARS'
            }
        ],
        back_urls: {
            "success": "http://localhost:3000/feedback",
            "failure": "http://localhost:3000/feedback",
            "pending": "http://localhost:3000/feedback"
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

    router.get('/feedback', function (req, res) {
        res.json({
            Payment: req.query.payment_id,
            Status: req.query.status,
            MerchantOrder: req.query.merchant_order_id
        });
    });

    router.get('/success', (req, res) => res.send('creando orden'))
});

module.exports = router;