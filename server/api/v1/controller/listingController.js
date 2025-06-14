const listingService = require('../services/listingService')
const asyncHandler = require('../../../utils/asyncHandler')

const createListing = asyncHandler(async (req, res, next) => {
    const dummy = '681f76c73a22521959e13cf0'
    const listing = await listingService.createListing(req.body, dummy)
    console.log(listing);
    return res.status(201).json({
        status: 'success',
        data: listing
    });
});

const updateListing = asyncHandler(async (req, res, next) => {
    const listing = await listingService.updateListing(req.params.id, req.body)
    return res.status(201).json({
        status: 'success',
        data: listing
    })
})

const deleteListing = asyncHandler(async (req, res, next) => {
    const listing = await listingService.deleteListing(req.params.id)
    return res.status(200).json({
        status: 'success',
        data: listing
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