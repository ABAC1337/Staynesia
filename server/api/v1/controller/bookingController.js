const asyncHandler = require('../../../utils/asyncHandler')
const bookingService = require('../services/bookingService')

const createBooking = asyncHandler(async (req, res, next) => {
    await bookingService.createBooking(req.user.id, req.body)
    return res.status(201).json({
        message: 'Booking Created'
    })
})

const updateBooking = asyncHandler(async (req, res, next) => {
    await bookingService.updateBooking(req.params.id, req.body)
    return res.status(200).json({
        message: "Booking Updated"
    })
})

const deleteBooking = asyncHandler(async (req, res, next) => {
    await bookingService.deleteBooking(req.params.id)
    return res.status(200).json({
        message: "Booking Deleted"
    })
})

const getBookingId = asyncHandler(async (req, res, next) => {
    const booking = await bookingService.getBookingById(req.params.id)
    return res.status(200).json({
        message: "Success",
        data: booking
    })
})

module.exports = {
    createBooking,
    updateBooking,
    deleteBooking,
    getBookingId
}