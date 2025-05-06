const DB = require('../../db/schema')

const createBookings = async (guestId, listingId, checkIn, checkOut, totalPrice, status) => {
    return await DB.Booking.create({
        guestId : guestId,
        listingId : listingId,
        checkIn : checkIn,
        checkOut : checkOut,
        totalPrice : totalPrice,
        status : status,
    })
}

const updateBookings = async (checkIn, checkOut, totalPrice) => {
    return await DB.Booking.findByIdAndUpdate({
        _id : id
    },{
        checkIn : checkIn,
        checkOut : checkOut,
        totalPrice : totalPrice,
    })
}

const deleteBookings = async (id) => {
    return await DB.Booking.findByIdAndDelete(id)
}

const getBookingsById = async (id) => {
    return await DB.Booking.findById(id)
}
