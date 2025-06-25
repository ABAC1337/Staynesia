const express = require('express')
const router = express.Router()

const bookingRoute = require('./routes/booking')
const listingRoute = require('./routes/listing')
const paymentRoute = require('./routes/payment')
const reviewRoute = require('./routes/review')
const wishlistRoute = require('./routes/wishlist')
const userRoute = require('./routes/user')
const guestRoute = require('./routes/guest')
const hostRoute = require('./routes/host')
const authMiddleware = require('../../middleware/authHandler')

router.use('/booking', authMiddleware.authRole('guest') ,bookingRoute)
router.use('/payment', authMiddleware.authRole('guest'), paymentRoute)
router.use('/review', authMiddleware.authRole('guest') ,reviewRoute)
router.use('/wishlist', authMiddleware.authRole('guest'), wishlistRoute)
router.use('/guest', authMiddleware.authRole('guest') ,guestRoute)

router.use('/listing', authMiddleware.authRole('host') ,listingRoute)
router.use('/host', authMiddleware.authRole('host') ,hostRoute)

router.use('/account', userRoute)

module.exports = router;