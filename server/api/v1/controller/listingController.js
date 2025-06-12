const listingService = require('../services/listingService')
const asyncHandler = require('../../../utils/asyncHandler')

const createListing = asyncHandler(async (req, res, next) => {
    const dummy = '681f76c73a22521959e13cf0'
    const listing = await listingService.createListing(req.body, dummy)
    console.log(listing);
    return res.status(200).json({
        status: 'success',
        data: listing
    });
})

module.exports = {
    createListing
}