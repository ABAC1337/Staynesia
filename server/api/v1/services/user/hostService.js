const ErrorHandler = require('../../../../utils/errorHandler')
const userRepo = require('../../repositories/userRepository')

const getHostListing = async (id) => {
    if (!id) throw new ErrorHandler('Host not found', 404)
    const queryObj = {}
    const filterObj = {}
    const optionsObj = {
        populate: {
            path: 'listings'
        },
        select: 'listings'
    }
    filterObj._id = id
    queryObj.filterObj = filterObj
    queryObj.optionsObj = optionsObj
    return await userRepo.findUser(queryObj)
}

const getHostBooking = async (id) => {
    if (!id) throw new ErrorHandler('Host not found', 404)
    const queryObj = {}
    const filterObj = {}
    const optionsObj = {
        populate: {
            path: 'bookings',
            populate: {
                path: 'userId',
                select: 'name email'
            }
        },
        select: 'bookings'
    }
    filterObj._id = id
    queryObj.filterObj = filterObj
    queryObj.optionsObj = optionsObj
    return await userRepo.findUser(queryObj)
}

const getHostReview = async (id) => {
    if (!id) throw new ErrorHandler('Host not found', 404)
    const queryObj = {}
    const filterObj = {}
    const optionsObj = {
        populate: {
            path: 'listings',
            populate: {
                path: 'reviews',
                populate: {
                    path: 'userId',
                    select: 'name'
                }
            }
        },
        select: 'listings'
    }
    filterObj._id = id
    queryObj.filterObj = filterObj
    queryObj.optionsObj = optionsObj
    return await userRepo.findUser(queryObj)
}

const getHostPayment = async (id) => {
    if (!id) throw new ErrorHandler('Host not found', 404)
    const queryObj = {}
    const filterObj = {}
    const optionsObj = {
        populate: {
            path: 'listings',
            populate: {
                path: 'bookings',
                match: {bookingStatus: 'success'},
                select: 'bookings',
                populate: {
                    path: 'paymentId',
                    match: {paymentStatus: 'success'},
                }
            }
        },
        select: 'listings'
    }
    filterObj._id = id
    queryObj.filterObj = filterObj
    queryObj.optionsObj = optionsObj
    return await userRepo.findUser(queryObj)
}

module.exports = {
    getHostBooking,
    getHostListing,
    getHostReview,
    getHostPayment
}