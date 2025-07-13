const express = require('express')
const bookingController = require('../../../controller/bookingController')
const cacheHandler = require('../../../middleware/cacheHandler')
const router = express.Router()

router.post('/create', bookingController.createBooking)
router.post('/update-status', bookingController.updateStatus)
router.route('/:id')
    .get(cacheHandler, bookingController.getBookingId)
    .patch(bookingController.updateBooking)
    .delete(bookingController.deleteBooking)

module.exports = router