import DB from '../../../models/schema'

const createBooking = async (query) => {
    return await DB.Booking.create(query);
}

const findBookingById = async (id) => {
    return await DB.Booking.findById(id);
}

const findBooking = async (query) => {
    return await DB.Booking.find(query);
}

const findBookingByPopulate = async (query, option) => {
    return await DB.Booking.find(query).populate(option)
}

const updateBooking = async (query) => {
    return await DB.Booking.findByIdAndUpdate(query);
}

const deleteBooking = async (id) => {
    return await DB.Booking.findByIdAndDelete(id);
}

module.exports = {
    createBooking,
    findBookingById,
    findBooking,
    findBookingByPopulate,
    updateBooking,
    deleteBooking
}