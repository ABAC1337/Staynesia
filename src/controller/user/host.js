const DB = require('../../db/schema')

const createHost = async (name, email, hashPass) => {
    return await DB.Host.create({
        name : name,
        email : email,
        password : hashPass
    })
}
const findHostEmail = async (payload) => {
    return host = await DB.Host.findOne({
        email : payload
    })
}

module.exports = {
    findHostEmail,
    createHost
}
