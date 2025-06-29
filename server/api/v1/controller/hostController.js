const asyncHandler = require('../../../utils/asyncHandler')
const hostService = require('../services/user/hostService')

const getListing = asyncHandler(async (req, res, next) => {
    const host = await hostService.getHostListing(req.user.id)
    
    return res.status(200).json({
        message: 'Success',
        data: host
    })
})

const getBooking = asyncHandler(async (req, res, next) => {
    const host = await hostService.getHostBooking(req.user.id)
    return res.status(200).json({
        message: 'Success',
        data: host
    })
})

const getReview = asyncHandler(async (req, res, next) => {
    const host = await hostService.getHostReview(req.user.id)
    return res.status(200).json({
        message: 'Success',
        data: host
    })
})

const getPayment = asyncHandler(async (req, res, next) => {
    const host = await hostService.getHostPayment(req.user.id)
    return res.status(200).json({
        message: 'Success',
        data: host
    })
})

module.exports = {
    getBooking,
    getListing,
    getReview,
    getPayment
}