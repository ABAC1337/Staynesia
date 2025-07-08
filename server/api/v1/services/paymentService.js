const paymentRepo = require('../repositories/paymentRepository')
const bookingRepo = require('../repositories/bookingRepository')
const userRepo = require('../repositories/userRepository')
const ErrorHandler = require('../../../utils/errorHandler')
const midtransClient = require('midtrans-client')
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')

const createPayment = async (userId, data) => {
    if (!data) throw new ErrorHandler('Value not found', 404)
    const { bookingId, duration, amount, taxAmount, feeAmount, title, price, first_name, email, phone } = data;

    const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY
    })
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
        callbacks: `${process.env.FRONTEND_APP_URL}/payments/midtrans/finish`
    };

    const paymentData = {
        order_id: order_id,
        paymentMethod: 'Midtrans',
        amount: amount,
        bookingId: bookingId,
        userId: userId
    }

    const payment = await paymentRepo.createPayment(paymentData)
    await Promise.all([
        bookingRepo.updateBooking(payment.bookingId, { paymentId: payment._id }),
        userRepo.updateUser(payment.userId, { $addToSet: { payments: payment._id } })
    ])
    return await snap.createTransaction(parameter)
}

const updateStatusBasedOnMidtrans = async (data) => {
    const { order_id, status_code, gross_amount, signature_key, settlement_time,
        transaction_status: ts, fraud_status: fs, payment_type } = data;
    const payment = await paymentRepo.findPaymentById(data.order_id)
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
    } else if (ts == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
        newStatus = 'cancel'
    } else if (ts == 'pending') {
        newStatus = pending
    }

    if (!newStatus) throw new ErrorHandler('Unknown Payment Status', 404)
    if (payment.status == newStatus) throw new ErrorHandler('Status Still The Same', 400)
    const paymentData = {
        order_id: order_id,
        paymentStatus: newStatus,
        paymentMethod: payment_type,
        paidAt: settlement_time
    }
    return await paymentRepo.updatePayment(payment._id, paymentData)
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