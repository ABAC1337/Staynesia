const bookingRepo = require('../repositories/bookingRepository')
const listingRepo = require('../repositories/listingRepository')
const userRepo = require('../repositories/userRepository')
const ErrorHandler = require('../../../utils/errorHandler')

const createBooking = async (data) => {
    console.log(data)
    if (!data) throw new ErrorHandler('Value not found', 404)
    if (new Date(data.checkIn) >= new Date(data.checkOut))
        throw new ErrorHandler('Invalid Date', 400)
    const bookedDates = await getBookedDates(data.listingId)    
    const available = isBookingAvailable(bookedDates, data.checkIn, data.checkOut)
    if (!available) throw new ErrorHandler('Cannot book due to booked by someone', 400)
    if (data.totalPrice < 0)
        throw new ErrorHandler('Invalid Value, value was minus', 400)
    const booking = await bookingRepo.createBooking(data)
    if (!booking) throw new ErrorHandler('Failed to create booking', 400)
    await Promise.all([
        listingRepo.updateListing(booking.listingId, { $addToSet: { bookings: booking._id } }),
        userRepo.updateUser(booking.userId, { $addToSet: { bookings: booking._id } })
    ]);

    return booking
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

function isBookingAvailable(bookedDates, newCheckIn, newCheckOut) {
    const startDate = new Date(newCheckIn);
    const endDate = new Date(newCheckOut);
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (bookedDates.includes(dateStr)) return false;
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return true;
}

const getBookedDates = async (listingId) => {
    const booking = await bookingRepo.findBooking({ listingId: listingId });

    const result = [];
    for (const bd of booking) {
        let start = new Date(bd.checkIn);
        const end = new Date(bd.checkOut);
        if (isNaN(start) || isNaN(end))
            continue;
        while (start <= end) {
            result.push(start.toISOString().split('T')[0]);
            start.setDate(start.getDate() + 1);
        }
    }
    return result;
}

module.exports = {
    createBooking,
    getBookedDates,
    updateBooking,
    deleteBooking
}


