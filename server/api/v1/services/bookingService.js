const bookingRepo = require('../repositories/bookingRepository')
const ErrorHandler = require('../../../utils/errorHandler')

const createBooking = async (guestId, listingId, checkIn, checkOut, totalPrice, statusBooking) => {
    const query = { guestId, listingId, checkIn, checkOut, totalPrice, statusBooking }

    if (new Date(checkIn) >= new Date(checkOut))
        throw new ErrorHandler('Invalid Date', 400)

    if (totalPrice < 0)
        throw new ErrorHandler('Invalid Value, value was minus', 400)

    return await bookingRepo.createBooking(query)
}

const getBookingById = async (id) => {
    return await bookingRepo.findBookingById(id)
}

const updateBooking = async (id, checkIn, checkOut, numGuest) => {
    const query = { id, checkIn, checkOut, numGuest }

    if (new Date(checkIn) >= new Date(checkOut))
        throw new ErrorHandler('Invalid Date', 400)

    return await bookingRepo.updateBooking(query)
}

const deleteBooking = async (id) => {
    return await bookingRepo.deleteBooking(id)
}

module.exports = {
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking
}


