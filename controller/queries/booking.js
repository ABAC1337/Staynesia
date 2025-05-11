const DB = require('../../models/schema')

const createBookings = async (guestId, listingId, checkIn, checkOut, totalPrice, statusBooking) => {
    return await DB.Booking.create({
        guestId : guestId,
        listingId : listingId,
        checkIn : checkIn,
        checkOut : checkOut,
        totalPrice : totalPrice,
        statusBooking : statusBooking,
    })
}

const updateBookings = async (id, checkIn, checkOut, totalPrice) => {
    return await DB.Booking.findByIdAndUpdate({
        _id : id
    },{
        checkIn : checkIn,
        checkOut : checkOut,
        totalPrice : totalPrice,
    })
}

const updateStatusBooking = async (id, statusBooking) => {
    return await DB.Booking.findByIdAndUpdate({
        _id : id
    },{
        statusBooking : statusBooking
    })
}

const deleteBookings = async (id) => {
    return await DB.Booking.findByIdAndDelete(id)
}

const findBookingById = async (id) => {
    return await DB.Booking.findById(id)
}

module.exports = {
    createBookings,
    updateBookings,
    updateStatusBooking,
    deleteBookings,
    findBookingById
}