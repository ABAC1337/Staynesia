const express = require('express');
const router = express.Router()
const listingController = require('../controller/listingController')

router.post('/create', listingController.createListing)

module.exports = router