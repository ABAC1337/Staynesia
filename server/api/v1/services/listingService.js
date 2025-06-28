const listingRepo = require('../repositories/listingRepository')
const userRepo = require('../repositories/userRepository')
const ErrorHandler = require('../../../utils/errorHandler')

const createListing = async (id, data) => {
    if (!data) 
        throw new ErrorHandler('Value not found', 404)
    if (!id)
        throw new ErrorHandler('Host not found', 404)

    const { province, city, address, category, title, description, checkIn, checkOut,
        nightTime, additional, imgUrl, facility, capacity, price } = data
    const location = { province, city, address }
    const rules = { checkIn, checkOut, nightTime, additional }
    const hostId = id
    const queryObj = {
        location, category, title, description, rules, imgUrl,
        facility, capacity, price, hostId
    }
    const listing = await listingRepo.createListing(queryObj)
    if (!listing) throw new ErrorHandler('Failed to create listing', 400)
    await userRepo.updateUser(hostId, { $addToSet: { listings: listing._id } })
    return listing
}

const updateListing = async (id, data) => {
    if (!id) 
        throw new ErrorHandler('Listing not found', 404)
    const { province, city, address, category, title, description, checkIn, checkOut,
        nightTime, additional, imgUrl, facility, capacity, price } = data
    const location = { province, city, address }
    const rules = { checkIn, checkOut, nightTime, additional }
    const queryObj = {
        location, category, title, description, rules, imgUrl,
        facility, capacity, price, host
    }
    const listing = await listingRepo.updateListing(id, queryObj)
    if (!listing) throw new ErrorHandler('Listing not found', 404)
    return listing
}

const deleteListing = async (id) => {
    if (!id) 
        throw new ErrorHandler('Listing not found', 404)
    const listing = await listingRepo.deleteListing(id)
    if (!listing) throw new ErrorHandler('Listing not found', 404)
    return listing
}

const getPagination = async (params) => {
    const { province, city, category, facility, sort, page } = params;
    const optionsObj = {}
    const filterObj = {}

    if (province || city) {
        if (province) filterObj["location.province"] = province;
        if (city) filterObj["location.city"] = city;
    }
    if (category) filterObj.category = category
    if (facility) {
        const facilities = facility.split(',').map(f => f.trim())
        filterObj.facility = { $all: facilities };
    }
    filterObj.isActive = true
    if (sort) {
        console.log(sort);

        const sortBy = String(sort).split(',').join(' ')
        console.log(sortBy);

        optionsObj.sort = sortBy ? sortBy : 'createdAt';
    }
    // Pagination Logic
    const currentPage = parseInt(page) * 1 || 1;
    optionsObj.limit = 16
    optionsObj.skip = (currentPage - 1) * optionsObj.limit;
    optionsObj.select = 'title category location.city location.province price rating numRating' 
    const queryObj = {
        filterObj: filterObj,
        optionsObj: optionsObj
    }
    const listing = await listingRepo.findListing(queryObj)
    console.log(listing);
    return listing
}

const getListingId = async (id) => {
    if (!id) 
        throw new ErrorHandler('Listing not found', 404)
    const filterObj = {}
    const optionsObj = {
        populate: [
            {
                path: 'hostId',
                select: 'name createdAt',
            },
            {
                path: 'reviews',
                select: 'rating reviewText',
                populate: {
                    path: 'userId',
                    select: 'name createdAt'
                }
            },
        ],
        select: '-createdAt -updatedAt -wishlists -bookings'
    }
    const queryObj = {
        filterObj: filterObj,
        optionsObj: optionsObj
    }
    const listing = await listingRepo.findListing(queryObj)
    if (!listing) throw new ErrorHandler('Listing not found', 404)
    return listing
}

module.exports = {
    createListing,
    updateListing,
    deleteListing,
    getPagination,
    getListingId
}

