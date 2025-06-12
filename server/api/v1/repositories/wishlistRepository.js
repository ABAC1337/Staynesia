const DB = require('../../../models/schema')

const createWishlist = async (query) => {
    return await DB.Wishlist.create(query)
}

const deleteWishlist = async (id) => {
    return await DB.Wishlist.findByIdAndDelete(id)
}

module.exports = {
    createWishlist,
    findWishlist,
    deleteWishlist
}