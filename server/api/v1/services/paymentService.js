const paymentRepo = require('../repositories/paymentRepository')
const bookingRepo = require('../repositories/bookingRepository')
const userRepo = require('../repositories/userRepository')
const ErrorHandler = require('../../../utils/errorHandler')

const createPayment = async (data) => {
    if (!data) throw new ErrorHandler('Value not found', 404)
    const payment = await paymentRepo.createPayment(data)
    if (!payment) throw new ErrorHandler('Failed to create payment', 400)
    await Promise.all([
        bookingRepo.updateBooking(payment.bookingId, { paymentId: payment._id }),
        userRepo.updateUser(payment.userId, { $addToSet: { payments: payment._id } })
    ])
    return payment
}

const updatePayment = async (id, data) => {
    if (!id || !data) throw new ErrorHandler('Payment not found', 404)
    return await paymentRepo.updatePayment(id, data)
}

const deletePayment = async (id) => {
    if (!id) throw new ErrorHandler('Payment not found', 404)
    const payment = await paymentRepo.findPaymentById(id)
    await Promise.all([
        bookingRepo.updateBooking(payment.bookingId, { paymentId: payment._id }),
        userRepo.updateUser(payment.userId, { $pull: { bookings: booking._id } })
    ])
    return await paymentRepo.deletePayment(id)
}

module.exports = {
    createPayment,
    updatePayment,
    deletePayment
}