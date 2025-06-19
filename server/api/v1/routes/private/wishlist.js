const express = require('express');
const router = express.Router()
const wishlistController = require('../../controller/wishlistController')

router.post('/', wishlistController.createWishlist)
router.delete('/:id', wishlistController.deleteWishlist)

module.exports = router

