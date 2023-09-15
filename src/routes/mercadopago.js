const express = require('express');
const { createPreference, receiveWebhook } = require("../controllers/mercadoPagoController")
const router = express.Router();

/* /mp */

router.post("/create_preference", createPreference);
router.post("/webhook", receiveWebhook);
router.get("/success", (req, res) => res.send("Success"));

module.exports = router;