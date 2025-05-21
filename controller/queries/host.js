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

const findHostById = async (id) => {
    return await DB.Host.findById(id)
}

const emailExist = async (email) => {
    return await DB.Host.exists({
        email : email
    })
}

const updateHost= async (id, query) => {
    console.log(query);
    
    return await DB.Guest.findByIdAndUpdate({
        _id: id
    }, 
        query
    )
}

const deleteHost = async (id) => {
    return await DB.Host.findByIdAndDelete({
        _id : id
    })
}

module.exports = {
    createHost,
    findHostByLogin,
    findHostById,
    emailExist,
    updateHost,
    deleteHost
}