const asyncHandler = require('../../../utils/asyncHandler')
const paymentService = require('../services/paymentService')

const createPayment = asyncHandler(async (req, res, next) => {
    const payment = await paymentService.createPayment(req.user.id, req.body)
    return res.status(201).json({
        message: "Payment Created",
        data: payment
    })
})

const updateStatus = asyncHandler(async (req, res, next) => {
    await paymentService.updateStatusBasedOnMidtrans(req.body)
    return res.status(201).json({
        message: "Payment Status Updated"
    })
})

const deletePayment = asyncHandler(async (req, res, next) => {
    await paymentService.deletePayment(req.params.id, req.body)
    return res.status(201).json({
        message: "Payment Deleted"
    })
})

module.exports = {
    createPayment,
    deletePayment,
    updateStatus
}