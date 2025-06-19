const listingService = require('../services/listingService')
const asyncHandler = require('../../../utils/asyncHandler')

const createListing = asyncHandler(async (req, res, next) => {
    const listing = await listingService.createListing(req.body)
    return res.status(201).json({
        message: "Listing Created"
    });
});

const updateListing = asyncHandler(async (req, res, next) => {
    const listing = await listingService.updateListing(req.params.id, req.body)
    return res.status(200).json({
        message: "Listing Updated"
    });
})

const deleteListing = asyncHandler(async (req, res, next) => {
    const listing = await listingService.deleteListing(req.params.id)
    return res.status(200).json({
        message: "Listing Deleted"
    })
})

const pagination = asyncHandler(async (req, res, next) => { 
    const listing = await listingService.getAllListing(req.params)
    return res.status(200).json({
        status: 'success',
        data: listing
    })
})

const getListingId = asyncHandler(async (req, res, next) => {
    const listing = await listingService.getListingId(req.params.id)
})

module.exports = {
    createListing,
    updateListing,
    deleteListing
}