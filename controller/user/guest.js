const DB = require('../../db/schema')

const createGuest = async (name, email, hashPass) => {
    return await DB.Guest.create({
        name : name,
        email : email,
        hashPass : hashPass
    })
}

const emailExist = async (email) => {
    return await DB.Guest.exists({
        email : email
    })
}

const findGuestEmail = async (email) => {
    return await DB.Guest.findOne({
        email : email
    })
}

const updateGuest = async (id, name, email, newPass, profilePic) => {
    return await DB.Guest.findByIdAndUpdate({
        _id : id
    },{
        name : name,
        email : email,
        hashPass : newPass,
        imageUrl : profilePic
    })
}

const deleteGuest = async (id) => {
    return await DB.Guest.findByIdAndDelete(id)
}

module.exports = {
    findGuestEmail,
    emailExist,
    createGuest
}