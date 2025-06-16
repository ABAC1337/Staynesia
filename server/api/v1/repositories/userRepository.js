const DB = require('../../../models/schema')

const createUser = async (data) => {
    return await DB.User.create(data);
}

const findUser = async (data) => {
    return await DB.User.find(data);
}

const updateUser = async (id, data) => {
    return await DB.User.findByIdAndUpdate(id, data);
}

const deleteUser = async (id) => {
    return await DB.User.findByIdAndDelete(id);
}

module.exports = {
    createUser, 
    findUser, 
    updateUser, 
    deleteUser
}