const DB = require('../../../models/schema')

const createWishlist = async (data) => {
    return await DB.Wishlist.create(data)
}

const deleteWishlist = async (id) => {
    return await DB.Wishlist.findByIdAndDelete(id)
}

module.exports = {
    createWishlist,
    deleteWishlist
}