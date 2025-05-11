const { comparePassword } = require("../utils/bcrypt");
const guestQueries = require('./queries/guest')
const hostQueries = require('./queries/host')

const loginGuest = async (req, res) => {
    try {
        const payload = {
            username,
            email,
            password
        } = req.body

        if (!payload){
            return res.status(404).json('Not Found')
        }

        const guestExist = await guestQueries.findGuestByLogin(payload.username, payload.email)
        const passwordMatch = await comparePassword(payload.password, guestExist.hashPassword)
        if (!guestExist) {
            return res.status(404).json('Cannot Find Guest')
        } 
        if (!passwordMatch) {
            return res.status(401).json('Password False')
        }

        return res.status(200).json(guestExist)
    } catch (error) {
        res.status(401).json('Unauthorize Account')
    }
}

const loginHost = async (req, res) => {
    try {
        const payload = {
            username,
            email,
            password
        } = req.body

        if (!payload){
            return res.status(404).json('Not Found')
        }

        const hostExist = await hostQueries.findHostByLogin(payload.username, payload.email)
        const passwordMatch = await comparePassword(payload.password, hostExist.hashPassword)

        if (!hostExist) {
            return res.status(404).json('Cannot Find Guest')
        } 

        if (!passwordMatch){
            return res.status(401).json('Password False')
        }

        return res.status(200).json(hostExist)
    } catch (error) {
        res.status(401).json('Unauthorize Account')
    }
}

module.exports = {
    loginGuest,
    loginHost
};