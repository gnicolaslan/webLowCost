const express = require('express');
const { createPreference, buyerInfo, buySuccess } = require("../controllers/mercadoPagoController")
const router = express.Router();

/* /mp */

router.post("/create_preference", createPreference);
router.post("/buyer_info", buyerInfo)
router.get("/success", buySuccess);

module.exports = router;