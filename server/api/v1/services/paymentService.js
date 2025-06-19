const paymentRepo = require('../repositories/paymentRepository')
const ErrorHandler = require('../../../utils/errorHandler') 
const errorHandler = require('../middleware/errorHandler')

const createPayment = async (data) => {
    if (!data) throw new ErrorHandler('Value not found', 404)
    return await paymentRepo.createPayment(data)
}

const updatePayment = async (id, data) => {
    if (!id || !data) throw new errorHandler('Payment not found', 404)
    return await paymentRepo.updatePayment(id, data)
}

const deletePayment = async (id) => {   
    if (!id) throw new errorHandler('Payment not found', 404)
    return await paymentRepo.deletePayment(id)
}

module.exports = {
    createPayment,
    updatePayment,
    deletePayment
}