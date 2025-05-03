const DB = require('src/db/schema')

const createHost = async (name, email, hashPass) => {
    return await DB.Host.create({
        name : name,
        email : email,
        password : hashPass
    })
}
const findHostEmail = async (payload) => {
    return await DB.Host.exists({
        email : payload
    })
}

module.exports = {
    findHostEmail,
    createHost
}
