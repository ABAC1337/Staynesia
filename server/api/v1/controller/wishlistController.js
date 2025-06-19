const asyncHandler = require('../../../utils/asyncHandler')
const wishlistService = require('../services/wishlistService')

const createWishlist = asyncHandler(async (req, res, next) => {
    const wishlist = await wishlistService.createWishlist(req.body)
    return res.status(201).json({
        message: "Wishlist Created"
    })
})

const deleteWishlist = asyncHandler(async (req, res, next) => {
    const wishlist =  await wishlistService.deleteWishlist(req.params.id)
    return res.status(200).json({
        message: "Wishlist Deleted"
    })
})

module.exports = {
    createWishlist,
    deleteWishlist
}