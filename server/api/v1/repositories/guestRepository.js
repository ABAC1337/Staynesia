import DB from '../../../models/schema'

const createGuest = async (query) => {
    return await DB.Guest.create(query);
}

const findGuest = async (query) => {
    return await DB.Guest.find(query);
}

const updateGuest = async (query) => {
    return await DB.Guest.findByIdAndUpdate(query);
}

const deleteGuest = async (id) => {
    return await DB.Guest.findByIdAndDelete(id);
}

module.exports = {
    createGuest, 
    findGuestById, 
    findGuest, 
    findGuestByPopulate,
    updateGuest, 
    deleteGuest
}