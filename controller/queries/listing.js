const DB = require('../../models/schema')

const createListings = async (
    location, 
    category, 
    title, 
    description, 
    imgUrl, 
    facility, 
    capacity, 
    price, 
    host
    ) => {
    return await DB.Listing.create({
        location: location,
        category: category,
        title: title,
        description: description,
        imgUrl: imgUrl,
        facility: facility,
        capacity: capacity,
        price: price,
        host: host
    })
}

const getListingsById = async (id) => {
    return await DB.Listing.findById(id)
}

const getListingsByPagination = async (page, limit, query, sortBy) => {
    console.log(page, limit, query, sortBy);
    const skip = (page - 1) * limit

    // Query Logic
    const listing = await DB.Listing.find(query)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
    
    // Pagination Logic
    const total = await DB.Listing.countDocuments(query)
    const totalPages = Math.ceil(total / limit)

    return res.status(200).json({
        data: listing,
        currentPage: page,
        totalPages: totalPages,
        totalItems: total
    })
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

const updateSoldCount = async (id,) => {
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

const updateListings = async (
    id, 
    location, 
    category, 
    title, 
    description, 
    imgUrl, 
    facility, 
    capacity, 
    price, 
    host
    ) => {
    return await DB.Listing.findByIdAndUpdate({
        _id : id
    },{
        location: location,
        category: category,
        title: title,
        description: description,
        imgUrl: imgUrl,
        facility: facility,
        capacity: capacity,
        price: price,
        host: host
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