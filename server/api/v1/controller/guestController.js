const asyncHandler = require('../../../utils/asyncHandler')
const guestService = require('../services/user/guestService')

const getBooking = asyncHandler(async (req, res, next) => {
    const guest = await guestService.getGuestBooking(req.user.id, req.query.statusFilter)
    return res.status(200).json({
        message: "Success",
        data: guest
    })
})

const getPayment = asyncHandler(async (req, res, next) => {
    const guest = await guestService.getGuestPayment(req.user.id, req.query.statusFilter)
    return res.status(200).json({
        message: "Success",
        data: guest
    })
})

const getWishlist = asyncHandler(async (req, res, next) => {
    const guest = await guestService.getGuestWishlist(req.user.id)
    return res.status(200).json({
        message: 'Success',
        data: guest
    })
})

module.exports = {
    getBooking,
    getPayment,
    getWishlist
}