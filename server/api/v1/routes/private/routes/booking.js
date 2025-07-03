const express = require('express')
const bookingController = require('../../../controller/bookingController')
const router = express.Router()

router.post('/create', bookingController.createBooking)
router.route('/:id')
    .get(bookingController.getBookingId)
    .patch(bookingController.updateBooking)
    .delete(bookingController.deleteBooking)

module.exports = router