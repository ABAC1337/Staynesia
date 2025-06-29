const DB = require('../../../models/schema')

const createUser = async (data) => {
    return await DB.User.create(data);
}

const findUserById = async (id) => {
    return await DB.User.findById(id)
}

const findUser = async (queryObj) => {
    const { filterObj = {}, optionsObj = {} } = queryObj;
    const { populate, select } = optionsObj
    let query = DB.User.find(filterObj)
    if (populate)
        if (Array.isArray(populate)) {
            optionsObj.populate.forEach((pop) => {
                query = query.populate(pop)
            })
        } else
            query = query.populate(populate)
    if (select)
        query = query.select(select)
    return await query;
}

const updateUser = async (id, data) => {
    return await DB.User.findByIdAndUpdate(id, data);
}

const deleteUser = async (id) => {
    return await DB.User.findByIdAndDelete(id);
}

module.exports = {
    createUser,
    findUserById,
    findUser,
    updateUser,
    deleteUser
}