const wishlistRepo = require('../repositories/wishlistRepository')
const ErrorHandler = require('../../../utils/errorHandler')

const createWishlist = async (guestId, listingId) => {
    const query = { guestId, listingId }
    if (!query)
        throw new ErrorHandler('Data Not Found', 404)
    return await wishlistRepo.createWishlist(query)
}

const deleteWishlist = async (id) => {
    if (!id)
        throw new ErrorHandler('Data Not Found', 404)
    return await wishlistRepo.deleteWishlist(id)
}

module.exports = {
    createWishlist,
    deleteWishlist
};