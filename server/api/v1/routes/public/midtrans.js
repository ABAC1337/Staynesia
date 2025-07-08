const express = require("express");
const router = express.Router();
const paymentController = require('../../controller/paymentController')

router.post('/notification', paymentController.updateStatus)

module.exports = router