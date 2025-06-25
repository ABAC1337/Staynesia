const DB = require('../../../models/schema')

const createPayment = async (data) => {
    return await DB.Payment.create(data);
}

const findPaymentById = async (id) => {
    return await DB.Payment.findById(id);
}

const findPayment = async (data) => {
    return await DB.Payment.find(query);
}

const updatePayment = async (id, data) => {
    return await DB.Payment.findByIdAndUpdate(id, data);
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