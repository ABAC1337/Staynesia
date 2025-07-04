const DB = require('../../../models/schema')

const createWishlist = async (data) => {
    return await DB.Wishlist.create(data)
}

const findOneWishlist = async (data) => {
    return await DB.Wishlist.findOne(data)
}

const deleteWishlist = async (id) => {
    return await DB.Wishlist.findByIdAndDelete(id)
}

module.exports = {
    createWishlist,
    findOneWishlist,
    deleteWishlist
}