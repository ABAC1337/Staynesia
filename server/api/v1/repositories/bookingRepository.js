const DB = require('../../../models/schema')

const createBooking = async (data) => {
    return await DB.Booking.create(data);
}

const findBookingById = async (id) => {
    return await DB.Booking.findById(id);
}

const findBooking = async (data) => {
    return await DB.Booking.find(data);
}

const updateBooking = async (id, data) => {
    return await DB.Booking.findByIdAndUpdate(id, data);
}

const deleteBooking = async (id) => {
    return await DB.Booking.findByIdAndDelete(id);
}

module.exports = {
    createBooking,
    findBookingById,
    findBooking,
    updateBooking,
    deleteBooking
}