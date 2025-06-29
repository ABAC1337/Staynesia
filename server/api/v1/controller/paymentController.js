const asyncHandler = require('../../../utils/asyncHandler')
const paymentService = require('../services/paymentService')

const createPayment = asyncHandler(async (req, res, next) => {
    await paymentService.createPayment(req.body)
    return res.status(201).json({
        message: "Payment Created"
    })
})

const updatePayment = asyncHandler(async (req, res, next) => {
    await paymentService.updatePayment(req.params.id, req.body)
    return res.status(201).json({
        message: "Payment Updated"
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
    updatePayment
}