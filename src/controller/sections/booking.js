const DB = require('src/db/schema')

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

const getBookingsById = async (id) => {
    return await DB.Booking.findById(id)
}
