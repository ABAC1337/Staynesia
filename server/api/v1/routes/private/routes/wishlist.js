const express = require('express');
const router = express.Router()
const wishlistController = require('../../../controller/wishlistController')

router.post('/create', wishlistController.createWishlist)
router.delete('/:id', wishlistController.deleteWishlist)

module.exports = router

