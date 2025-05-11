const DB = require('../../models/schema')

const createHost = async (name, username, email, hashPassword) => {
    return await DB.Host.create({
        name : name,
        username : username,
        email : email,
        hashPassword : hashPassword
    })
}

const findHostByLogin = async (username, email) => {
    return await DB.Host.findOne({ 
        $or : [
            {email : email},
            {username : username}
        ]
    })
}

const emailExist = async (email) => {
    return await DB.Host.exists({
        email : email
    })
}

const updateHostName = async (id, name) => {
    return await DB.Host.findByIdAndUpdate({
        _id : id
    },{
        name : name,
    })
}

const updateHostPassword = async (id, password) => {
    return await DB.Host.findByIdAndUpdate({
        _id : id
    },{
        hashPassword : password,
    })
}

const deleteHost = async (id) => {
    return await DB.Host.findByIdAndDelete({
        _id : id
    })
}

module.exports = {
    createHost,
    findHostByLogin,
    emailExist,
    updateHostName,
    updateHostPassword,
    deleteHost
}