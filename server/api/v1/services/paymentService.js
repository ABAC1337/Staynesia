const paymentRepo = require('../repositories/paymentRepository')
const bookingRepo = require('../repositories/bookingRepository')
const listingRepo = require('../repositories/listingRepository')
const userRepo = require('../repositories/userRepository')
const ErrorHandler = require('../../../utils/errorHandler')
const bookingService = require('./bookingService')
const snap = require('../../../config/midtrans')
const mailer = require('../../../utils/mailer')
const date = require('../../../utils/date')
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')

const createPayment = async (userId, data) => {
    if (!data) throw new ErrorHandler('Value not found', 404)
    const { bookingId, duration, amount, taxAmount, feeAmount, title, price, first_name, email, phone } = data;

    const order_id = 'ORDER-' + uuidv4()
    const tax_id = 'TAX-' + uuidv4()
    const totalTax = parseInt(taxAmount) + parseInt(feeAmount)
    const parameter = {
        transaction_details: {
            order_id: order_id,
            gross_amount: parseInt(amount),
        },
        item_details: [
            {
                id: bookingId,
                price: parseInt(price),
                quantity: parseInt(duration),
                name: title
            },
            {
                id: tax_id,
                price: totalTax,
                quantity: 1,
                name: 'Tax and Fee'
            }
        ],
        customer_details: {
            first_name: first_name,
            email: email,
            phone: phone,
        },
        credit_card: { secure: true },
        callback_url: `${process.env.FRONTEND_APP_URL}/bookings`
    };

    const midtrans = await snap.createTransaction(parameter)
    const paymentData = {
        order_id: order_id,
        paymentMethod: 'Midtrans',
        amount: amount,
        midtrans_redirect: midtrans.redirect_url,
        midtrans_token: midtrans.token,
        bookingId: bookingId,
        userId: userId
    }

    const payment = await paymentRepo.createPayment(paymentData)
    await Promise.all([
        bookingRepo.updateBooking(payment.bookingId, { paymentId: payment._id }),
        userRepo.updateUser(payment.userId, { $addToSet: { payments: payment._id } })
    ])

    return midtrans
}

const updateStatusBasedOnMidtrans = async (data) => {
    const { order_id, status_code, gross_amount, signature_key, settlement_time,
        transaction_status: ts, fraud_status: fs, payment_type } = data;

    const payment = await paymentRepo.findPayment({ order_id: order_id })
    const booking = await bookingRepo.findBookingById(payment.bookingId)
    if (!payment)
        throw new ErrorHandler('Order Id Not Found', 404)

    const hash = crypto.createHash('sha512')
        .update(`${order_id}${status_code}${gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
        .digest('hex');
    if (signature_key !== hash)
        throw new ErrorHandler('Invalid Signature Key', 400)

    let newStatus;
    if (ts == 'capture') {
        if (fs == 'accept')
            newStatus = 'success'
    } else if (ts == 'settlement') {
        newStatus = 'success'
    } else if (ts == 'cancel' || ts == 'deny' || ts == 'expire') {
        newStatus = 'canceled'
    } else if (ts == 'pending') {
        newStatus = 'pending'
    } else
        newStatus = 'canceled'

    if (!newStatus) throw new ErrorHandler('Unknown Payment Status', 404)
    if (payment.paymentStatus == newStatus) return payment
    if (newStatus == 'success') {
        const user = await userRepo.findUserById(payment.userId)
        const getBookedDates = await bookingService.getBookedDates(booking.listingId)
        const available = bookingService.isBookingAvailable(getBookedDates, booking.checkIn, booking.checkOut)
        if (!available)
            throw new ErrorHandler("Cannot book due to booked by someone, please change the schedule", 400);

        await Promise.all([
            bookingRepo.updateBooking(payment.bookingId, { bookingStatus: 'confirmed', paymentId: payment._id }),
            mailer.sendEmail(user.email, "Payment Success", "Payment dah selesai yh")
        ])
    }
    if (payment.status == 'cancel') {
        await bookingRepo.updateBooking(payment.bookingId, { paymentId: '' })
    }
    const paymentData = {
        paymentStatus: newStatus,
        paymentMethod: payment_type,
        paidAt: date.converter(settlement_time)
    }

    const getBookedDates = await bookingService.getBookedDates(booking.listingId)
    return await Promise.all([
        listingRepo.updateListing(booking.listingId, { bookedDate: getBookedDates }),
        paymentRepo.updatePayment(payment._id, paymentData)
    ])
}

const deletePayment = async (id) => {
    if (!id) throw new ErrorHandler('Payment not found', 404)
    const payment = await paymentRepo.findPaymentById(id)
    await Promise.all([
        bookingRepo.updateBooking(payment.bookingId, { paymentId: null }),
        userRepo.updateUser(payment.userId, { $pull: { bookings: booking._id } })
    ])
    return await paymentRepo.deletePayment(id)
}

module.exports = {
    createPayment,
    updateStatusBasedOnMidtrans,
    deletePayment
}