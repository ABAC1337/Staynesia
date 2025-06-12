const DB = require('../../../models/schema')

const createHost = async (data) => {
    return await DB.Host.create(data);
}

const findHost = async (data) => {
    return await DB.Host.find(data);
}

const updateHost = async (data) => {
    return await DB.Host.findByIdAndUpdate(data);
}

const deleteHost = async (id) => {
    return await DB.Host.findByIdAndDelete(id);
}

module.exports = { 
    createHost, 
    findHost, 
    updateHost, 
    deleteHost
}