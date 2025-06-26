const wishlistRepo = require('../repositories/wishlistRepository')
const listingRepo = require('../repositories/listingRepository')
const userRepo = require('../repositories/userRepository')
const ErrorHandler = require('../../../utils/errorHandler')

const createWishlist = async (data) => {
    if (!data) throw new ErrorHandler('Data Not Found', 404)
    const wishlist = await wishlistRepo.createWishlist(data)
    if (!wishlist) throw new ErrorHandler('Failed to create wishlist', 400)
    await userRepo.updateUser(wishlist.userId, {$addToSet: {wishlists: wishlist._id}})
    return wishlist
}

const deleteWishlist = async (id) => {
    if (!id) throw new ErrorHandler('Data Not Found', 404)
    return await wishlistRepo.deleteWishlist(id)
}

module.exports = {
    createWishlist,
    deleteWishlist
};