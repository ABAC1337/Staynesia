const DB = require('../../../models/schema')

const createBooking = async (data) => {
    return await DB.Booking.create(data);
}

const findBookingById = async (id) => {
    return await DB.Booking.findById(id);
}

const findBooking = async (queryObj) => {
    const { filterObj = {}, optionsObj = {} } = queryObj;
    const { populate, select } = optionsObj;
    let query = DB.Booking.find(filterObj);
    if (populate)
        if (Array.isArray(populate)) {
            populate.forEach((pop) => {
                query = query.populate(pop);
            });
        } else query = query.populate(populate);
    if (select) query = query.select(select);
    return await query;
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