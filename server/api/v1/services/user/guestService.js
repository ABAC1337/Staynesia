const ErrorHandler = require('../../../../utils/errorHandler')
const userRepo = require('../../repositories/userRepository')
const date = require("../../../../utils/date");

const getGuestBooking = async (id, statusFilter) => {
    if (!id) throw new ErrorHandler('User not found', 404)
    const queryObj = {}
    const filterObj = {}
    const optionsObj = {
        populate: {
            path: 'bookings',
            match: statusFilter ? { bookingStatus: statusFilter } : {},
            select: 'checkIn numGuest checkOut totalPrice bookingStatus',
            populate: [
                {
                    path: 'listingId',
                    select: 'title location.province imgUrl location.city',
                    populate: {
                        path: "hostId",
                        select: "name"
                    }
                },
                {
                    path: 'paymentId',
                    select: 'midtrans_redirect'
                }
            ]
        },
        select: 'bookings'
    }
    filterObj._id = id
    queryObj.filterObj = filterObj
    queryObj.optionsObj = optionsObj
    const users = await userRepo.findUser(queryObj)
    const userMap = users.map((user) => {
        const bookingMap = (user.bookings || []).map((booking) => {
            const b = booking.toObject ? booking.toObject() : booking;
            return {
                ...b,
                checkInWIB: date.WIBConverter(b.checkIn),
                checkOutWIB: date.WIBConverter(b.checkOut)
            }
        }).map(({ checkIn, checkOut, ...rest }) => rest)
        return bookingMap
    })
    return userMap
}

const getGuestPayment = async (id, statusFilter) => {
    if (!id) throw new ErrorHandler('User not found', 404)
    const queryObj = {}
    const filterObj = {}
    const optionsObj = {
        populate: {
            path: 'payments',
            match: statusFilter ? { paymentStatus: statusFilter } : {},
            select: 'paymentMethod paymentStatus amount paidAt bookingId midtrans_redirect',
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
    const users = await userRepo.findUser(queryObj)
    const userMap = users.map((user) => {
        const paymentMap = (user.payments || []).map((payment) => {
            const p = payment.toObject ? payment.toObject() : payment;
            return {
                ...b,
                paidAtWIB: date.WIBConverter(p.paidAt)
            }
        }).map(({ paidAt, ...rest }) => rest)
        return paymentMap
    })
    return userMap
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