const DB = require('../../../models/schema')

const createPayment = async (query) => {
    return await DB.Payment.create(query);
}

const findPaymentById = async (id) => {
    return await DB.Payment.findById(id);
}

const findPayment = async (query) => {
    return await DB.Payment.find(query);
}

const updatePayment = async (query) => {
    return await DB.Payment.findByIdAndUpdate(query);
}

const deletePayment = async (id) => {
    return await DB.Payment.findByIdAndDelete(id);
}

module.exports = {
    createPayment,
    findPaymentById,
    findPayment,
    updatePayment,
    deletePayment
}   