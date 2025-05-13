const express = require('express')
const router = express.Router()
const listingController = require('../../controller/listingController')


router.get('/top-rating', listingController.topRating)
router.get('/top-sales', listingController.topSales)
router.get('/most-affordable', listingController.mostAffordable)

router.post('/create-listing', listingController.createListing)
router.post('/update-listing', listingController.updateListing)
router.post('/delete-listing', listingController.deleteListing)

router.post('/spaces', listingController.pagination)

module.exports = router