const express = require('express')
const router = express.Router()
const hostController = require('../../../controller/hostController')

router.get('/booking', hostController.getBooking)
router.get('/payment', hostController.getPayment)
router.get('/listing', hostController.getListing)
router.get('/payment', hostController.getPayment)

module.exports = router