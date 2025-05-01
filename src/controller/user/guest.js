const DB = require('../../db/schema')

const createGuest = async (name, email, hashPass) => {
    return await DB.Guest.create({
        name : name,
        email : email,
        hashPass : hashPass
    })
}
const findGuestEmail = async (payload) => {
    return await DB.Guest.findOne({
        email : payload
    })
}

module.exports = {
    findGuestEmail,
    createGuest
}