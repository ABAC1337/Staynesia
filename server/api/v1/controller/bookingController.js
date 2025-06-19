const asyncHandler = require('../../../utils/asyncHandler')
const bookingService = require('../services/bookingService')

const createBooking = asyncHandler(async (req, res, next) => {
    const booking = await bookingService.createBooking(req.body)
    return res.status(201).json({
        message: 'Booking Created'
    })
})

const updateBooking = asyncHandler(async (req, res, next) => {
    const booking = await bookingService.updateBooking(req.paras.id, req.body)
    return res.status(200).json({
        message: "Booking Updated"
    })
})

const deleteBooking = asyncHandler(async (req, res, next) => {
    const booking = await bookingService.deleteBooking(req.params.id)
    return res.status(200).json({
        message: "Booking Deleted"
    })
})

module.exports = {
    createBooking,
    updateBooking,
    deleteBooking
}