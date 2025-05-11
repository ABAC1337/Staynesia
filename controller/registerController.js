const { hashPassword } = require("../utils/bcrypt");
const guestQueries = require('./queries/guest')
const hostQueries = require('./queries/host')

const isMatch = (pass, confirmPass) => {
    if (pass != confirmPass) {
        
        return res.status(400).json('Password Miss Match') 
    }
    return confirmPass
}   

const guestRegister = async(req, res) =>{
    const {
        name,
        username,
        email,
        password,
        confirmPass,
    } = req.body

    try {
        if (!name || !username || !email || !password || !confirmPass){
            return res.status(404).json('Not Found')
        }
        
        const passwordMatch = isMatch(password, confirmPass)
        const hashPass = await hashPassword(passwordMatch)
        const emailExist = await guestQueries.emailExist(email)

        if (!passwordMatch) {
            return res.status(404).json('Password Miss Match')
        }

        if (emailExist) {
            return res.status(404).json('Email Exist')
        }

        const create = await guestQueries.createGuest(name, username, email, hashPass)

        if (!create) {
            return res.status(404).json('Not Creating')
        }

        return res.status(200).json('Account Created')
    } catch (error) {
        res.status(400).json(error)
    }
}

const hostRegister = async(req, res) =>{
    const {
        name,
        username,
        email,
        password,
        confirmPass,
    } = req.body

    try {
        if (!name || !username || !email || !password || !confirmPass){
            return res.status(404).json('Not Found')
        }
        
        const passwordMatch = isMatch(password, confirmPass)
        console.log('tai');
        const hashPass = await hashPassword(passwordMatch)
        console.log('tai1');
        const emailExist = await hostQueries.emailExist(email)
        console.log('tai2');
        if (!passwordMatch) {
            return res.status(404).json('Password Miss Match')
        }

        if (emailExist) {
            return res.status(404).json('Email Exist')
        }

        const create = await hostQueries.createHost(name, username, email, hashPass)

        if (!create) {
            return res.status(404).json('Not Creating')
        }
        
        return res.status(200).json('Account Created')
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    guestRegister,
    hostRegister
}; 