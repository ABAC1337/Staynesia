const listingRepo = require('../repositories/listingRepository')

const createListing = async (province, city, address, category, title, description, imgUrl, facility, capacity, price, hostId) => {
    const location = { province, city, address }
    const query = { location, category, title, description, imgUrl, facility, capacity, price, hostId }

    return await listingRepo.createListing(query)
}

const updateListing = async (id, province, city, address, category, title, description, imgUrl, facility, capacity, price) => {
    const location = { province, city, address }
    const query = { id, location, category, title, description, imgUrl, facility, capacity, price }

    return await listingRepo.createListing(query)
}

const deleteListing = async (id) => {
    return await listingRepo.deleteListing(id)
}

const pagination = async (params) => {
    const { field, sort, filter } = params
    const queryParams = {}
    if (field) 
        queryParams.field = field
    if (filter)
        queryParams.filter = filter
    if (sort)
        queryParams.sort = sort
}

module.exports = {
    createListing,
    updateListing,
    deleteListing,
    getAllListing
}

