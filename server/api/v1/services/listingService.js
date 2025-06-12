const listingRepo = require('../repositories/listingRepository')
const ErrorHandler = require('../../../utils/errorHandler')

const createListing = async (data, host) => {
    if (!data) throw new ErrorHandler('Value not found', 404)
    const { province, city, address, category, title, description, checkIn, checkOut,
        nightTime, additional, imgUrl, facility, capacity, price } = data
    const location = { province, city, address }
    const rules = { checkIn, checkOut, nightTime, additional }
    const queryObj = {
        location, category, title, description, rules, imgUrl,
        facility, capacity, price, host
    }
    console.log(queryObj);
    return await listingRepo.createListing(queryObj)
}

const updateListing = async (data) => {
    if (!data.id) throw new ErrorHandler('Listing not found', 404)
    const { } = data
    return await listingRepo.createListing(data)
}

const deleteListing = async (id) => {
    return await listingRepo.deleteListing(id)
}

const getAllListing = async (params) => {
    const { sort, filter, page } = params;
    const queryObj = {}

    if (filter) {
        queryObj.filter = filter;
    }
    if (sort) {
        const sortBy = sort.split(',').join(' ')
        queryObj.sort = sortBy;
    } else
        queryObj.sort = '-createdAt'

    // Pagination Logic
    queryObj.page = page * 1 || 1;
    queryObj.limit = 16;
    queryObj.skip = (currentPage - 1) * limit;

    return await listingRepo.findListing(queryObj);
}

module.exports = {
    createListing,
    updateListing,
    deleteListing,
    getAllListing,

}

