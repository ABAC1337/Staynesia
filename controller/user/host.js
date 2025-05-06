const DB = require('../../db/schema')

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

const autoUpdateReviewsRatings = async (review, rating) => {
    
}

const updateHost = async (id, name, email, newPass, profilePic) => {
    const validation = findGuestEmail(email)
    if (validation) {
        console.error('email exist');
    }
    return await DB.Host.findByIdAndUpdate({
        _id : id
    },{
        name : name,
        email : email,
        hashPass : newPass,
        imageUrl : profilePic
    })
}

const deleteHost = async (id) => {
    return await DB.Guest.findByIdAndDelete(id)
}

module.exports = {
    findHostEmail,
    createHost
}
