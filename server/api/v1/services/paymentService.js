const paymentRepo = require('../repositories/paymentRepository')
const ErrorHandler = require('../../../utils/errorHandler') 

const createPayment = async (data) => {
    if (!data) throw new ErrorHandler('Value not found', 404)
    
}