const bookingRepo = require('../repositories/bookingRepository')
const ErrorHandler = require('../../../utils/errorHandler') 

const createBooking = async (data) => {
    if (!data) throw new ErrorHandler('Value not found', 404)
    if (new Date(data.checkIn) >= new Date(data.checkOut))
        throw new ErrorHandler('Invalid Date', 400)
    if (totalPrice < 0)
        throw new ErrorHandler('Invalid Value, value was minus', 400)
    return await bookingRepo.createBooking(data)
}

const getBookingById = async (id) => {
    return await bookingRepo.findBookingById(id)
}

const getBookedDates = async (listingId) => {
    const booking = await bookingRepo.findBooking(listingId)
    const result = {};
    for (const bd of booking) {
        let start = new Date(bd.checkIn);
        const end = new Date(bd.checkOut);
        if (isNaN(start) || isNaN(end))
            continue;
        while (start <= end) {
            result.push(start.toISOString.split('T')[0]);
            start.setDate(start.getDate() + 1);
        }
    }
    return result;
}

const updateBooking = async (data) => {
    if (!data.id) throw new ErrorHandler('Booking Not Found', 404)
    if (new Date(data.checkIn) >= new Date(data.checkOut))
        throw new ErrorHandler('Invalid Date', 400)
    return await bookingRepo.updateBooking(data)
}

const deleteBooking = async (id) => {
    return await bookingRepo.deleteBooking(id)
}

module.exports = {
    createBooking,
    getBookingById,
    getBookedDates,
    updateBooking,
    deleteBooking
}


