const DB = require('../../../models/schema')

const createGuest = async (data) => {
    return await DB.Guest.create(data);
}

const findGuest = async (data) => {
    return await DB.Guest.find(data);
}

const updateGuest = async (data) => {
    return await DB.Guest.findByIdAndUpdate(data);
}

const deleteGuest = async (id) => {
    return await DB.Guest.findByIdAndDelete(id);
}

module.exports = {
    createGuest, 
    findGuest, 
    updateGuest, 
    deleteGuest
}