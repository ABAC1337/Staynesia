const DB = require('../../db/schema')

const createWishlist = async (x, y) => {
    return await DB.Wishlist.create({
        guestId : x,
        listingId : y
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