const DB = require('../../db/schema')

const createWishlist = async (guestId, listingId) => {
    return await DB.Wishlist.create({
        guestId : guestId,
        listingId : listingId
    })
}

const getAllWishlistByGuestId = async (id) => {
    return await DB.Wishlist.find({
        guestId : id
    })
}

const deleteWishlist = async (id) => {
    return await DB.Wishlist.findByIdAndDelete(id)
}

module.exports = {
    createWishlist,
    getAllWishlistByGuestId,
    deleteWishlist
}