const DB = require('../../db/schema')
const booking = require('./booking')
const createListings = async () => {
    return await DB.Listing.create({
        // sek bentar lagi malas
    })
}

const getListingsById = async (id) => {
    return await DB.Listing.findById(id)
}

const getListingsByPagination = async () => {
    const page = req.query || 1
    const limit = 16 
    return await DB.Listing.find({}).skip((page - 1) * limit).limit(limit)
}

const getListingsByRatings = async () => {
    return await DB.Listing.find().sort({
        ratingCount: -1,
    })
}

const getListingsByAfford = async () => {
    return await DB.Listing.find().sort({
        price: 1
    })
}

const getListingsBySales = async () => {
    return await DB.Listing.find().sort({
        soldCount: -1
    })
}

const updateSoldCount = async (id) => {
    const totalBookings = DB.Booking.find({
        listingId : id
    }).countDocuments()
    console.log(totalBookings)
    return await DB.Listing.updateOne(
        { _id: id },
        {
            $set: {
                soldCount: totalBookings
            }
        })
}

const updateListings = async (id, ) => {
    return await DB.Listing.findByIdAndUpdate({
        _id : id
    },{

    })
}

const deleteListing = async (id) => {
    return await DB.Listing.findByIdAndDelete(id)
}

module.exports = {
    createListings,
    getListingsById,
    getListingsByPagination,
    getListingsByRatings,
    getListingsByAfford,
    getListingsBySales,
    updateListings,
    updateSoldCount,
    deleteListing
};