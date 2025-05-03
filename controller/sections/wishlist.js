const DB = require('../../db/schema')

const createWishlist = async (x, y) => {
    return DB.Wishlist.create({
        guestId : x,
        listingId : y
    })
}

const getAllWishlistByGuestId = async (id) => {
    return DB.Wishlist.find({
        guestId : id
    })
}