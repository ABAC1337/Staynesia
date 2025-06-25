const express = require('express')
const router = express.Router()
const guestController = require('../../../controller/guestController')

router.get('/booking', guestController.getBooking)
router.get('/payment', guestController.getPayment)
router.get('/wishlist', guestController.getWishlist)

module.exports = router