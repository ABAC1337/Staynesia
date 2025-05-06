const DB = require('../../db/schema')

const createGuest = async (name, email, hashPass) => {
    return await DB.Guest.create({
        name : name,
        email : email,
        hashPass : hashPass
    })
}
const findGuestEmail = async (payload) => {
    return await DB.Guest.exists({
        email : payload
    })
}

const updateGuest = async (id, name, email, newPass, profilePic) => {
    const validation = findGuestEmail(email)
    if (validation) {
        console.error('email exist');
    }
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
    createGuest
}