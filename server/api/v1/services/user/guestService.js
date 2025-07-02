const ErrorHandler = require('../../../../utils/errorHandler')
const userRepo = require('../../repositories/userRepository')

const getGuestBooking = async (id, statusFilter) => {
    if (!id) throw new ErrorHandler('User not found', 404)
    const queryObj = {}
    const filterObj = {}
    const optionsObj = {
        populate: {
            path: 'bookings',
            match: statusFilter ? { statusBooking: statusFilter } : {},
            select: 'checkIn numGuest checkOut totalPrice statusBooking',
            populate: {
                path: 'listingId',
                select: 'title location.province imgUrl location.city',
                populate: {
                    path: "hostId",
                    select: "name"
                }
            }
        },
        select: 'bookings'
    }
    filterObj._id = id
    queryObj.filterObj = filterObj
    queryObj.optionsObj = optionsObj
    return await userRepo.findUser(queryObj)
}

const getGuestPayment = async (id, statusFilter) => {
    if (!id) throw new ErrorHandler('User not found', 404)
    const queryObj = {}
    const filterObj = {}
    const optionsObj = {
        populate: {
            path: 'payments',
            match: statusFilter ? { paymentStatus: statusFilter } : {},
            select: 'paymentMethod paymentStatus amount paidAt bookingId',
            populate: {
                path: 'bookingId',
                select: '_id',
                populate: { path: 'listingId', select: 'title' }
            }
        },
        select: 'payments'
    }
    filterObj._id = id
    queryObj.filterObj = filterObj
    queryObj.optionsObj = optionsObj
    return await userRepo.findUser(queryObj)
}


const getGuestWishlist = async (id) => {
    if (!id) throw new ErrorHandler('User not found', 404)
    const queryObj = {}
    const filterObj = {}
    const optionsObj = {
        populate: {
            path: 'wishlists',
            select: 'listings',
            populate: {
                path: 'listingId',
                select: 'name location.province category rating price imgUrl location.city title rating numRating'
            }
        },
        select: 'wishlists'
    }
    filterObj._id = id
    queryObj.filterObj = filterObj
    queryObj.optionsObj = optionsObj
    return await userRepo.findUser(queryObj)
}


module.exports = {
    getGuestBooking,
    getGuestPayment,
    getGuestWishlist
}