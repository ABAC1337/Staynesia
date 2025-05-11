const DB = require('../../models/schema')

const createGuest = async (name, username, email, hashPassword) => {
    return await DB.Guest.create({
        name: name,
        username: username,
        email: email,
        hashPassword: hashPassword
    })
}

const findGuestByLogin = async (username, email) => {
    return await DB.Guest.findOne({
        $or: [
            { email: email },
            { username: username }
        ],
    })
}

const findGuestById = async (id) => {
    return await DB.Guest.findById(id)
}

const updateGuest = async (id, name, email, photo) => {
    return await DB.Guest.findByIdAndUpdate({
        _id: id
    }, {
        $or: [
            { name: !!name },
            { email: !!email },
            { imageUrl: !!photo }
        ]
    })
}

const updateGuestPassword = async (id, password) => {
    return await DB.Guest.findOne({
        _id: id
    }, {
        hashPassword: password
    })
}

const emailExist = async (email) => {
    return await DB.Guest.exists({
        email: email
    })
}

const deleteGuest = async (id) => {
    return await DB.Guest.findByIdAndDelete({
        _id: id
    })
}

module.exports = {
    createGuest,
    findGuestByLogin,
    findGuestById,
    updateGuest,
    updateGuestPassword,
    emailExist,
    deleteGuest
}