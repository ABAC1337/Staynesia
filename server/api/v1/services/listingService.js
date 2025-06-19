const listingRepo = require('../repositories/listingRepository')
const ErrorHandler = require('../../../utils/errorHandler')

const createListing = async (data, host) => {
    if (!data || !host) throw new ErrorHandler('Value not found', 404)
    const { province, city, address, category, title, description, checkIn, checkOut,
        nightTime, additional, imgUrl, facility, capacity, price } = data
    const location = { province, city, address }
    const rules = { checkIn, checkOut, nightTime, additional }
    const queryObj = {
        location, category, title, description, rules, imgUrl,
        facility, capacity, price, host
    }
    return await listingRepo.createListing(queryObj)
}

const updateListing = async (id, data) => {
    if (!id) throw new ErrorHandler('id not found', 404)
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
    if (!id) throw new ErrorHandler('id not found', 404)
    const listing = await listingRepo.deleteListing(id)
    if (!listing) throw new ErrorHandler('Listing not found', 404)
    return listing
}

const getPagination = async (params) => {
    const { province, city, category, facility, sort, page } = params;
    const location = { province, city }
    const queryObj = {}
    const filterObj = {}

    if (location) filterObj.location = location
    if (category) filterObj.category = category
    if (facility) filterObj.facility = facility

    queryObj.filterObj

    if (sort) {
        const sortBy = sort.split(',').join(' ')
        queryObj.sort = sortBy;
    } else
        queryObj.sort = '-createdAt'

    // Pagination Logic
    queryObj.page = page * 1 || 1;
    queryObj.limit = 16;
    queryObj.skip = (page - 1) * limit;

    return await listingRepo.findListing(queryObj)
}

const getListingId = async (id) => {
    if (!id) throw new ErrorHandler('id not found', 404)
    const listing = await listingRepo.findListingById(id)
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

