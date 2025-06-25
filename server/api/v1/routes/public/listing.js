const express = require('express')
const router = express.Router()
const listingController = require('../../controller/listingController')

router.get('/pagination', listingController.pagination)
router.get('/:id', listingController.getListingId)

module.exports = router