import DB from '../../../models/schema'

const createHost = async (query) => {
    return await DB.Host.create(query);
}

const findHost = async (query) => {
    return await DB.Host.find(query);
}

const updateHost = async (query) => {
    return await DB.Host.findByIdAndUpdate(query);
}

const deleteHost = async (id) => {
    return await DB.Host.findByIdAndDelete(id);
}

module.exports = {
    createHost, 
    findHostById, 
    findHost, 
    findHostByPopulate,
    updateHost, 
    deleteHost
}