const asyncHandler = require('../../../utils/asyncHandler')
const bookingService = require('../services/bookingService')

const createBooking = asyncHandler(async (req, res, next) => {
    const booking = await bookingService.createBooking(req.user.id, req.body)
    return res.status(201).json({
        message: 'Booking Created',
        data: booking._id
    })
})

const updateBooking = asyncHandler(async (req, res, next) => {
    await bookingService.updateBooking(req.params.id, req.body)
    return res.status(200).json({
        message: "Booking Updated"
    })
})

const updateStatus = asyncHandler(async (req, res, next) => {
    await bookingService.updateStatusBooking(req.params.id, req.query.status)
    return res.status(200).json({
        message: "Booking Status Updated"
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
    const booked = await bookingService.getBookedDates(booking[0].listingId._id);
    return res.status(200).json({
        message: "Success",
        data: booking,
        bookedData: booked
    })
})

module.exports = {
    createBooking,
    updateBooking,
    updateStatus,
    deleteBooking,
    getBookingId
}