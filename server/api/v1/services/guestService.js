const guestRepo = require('../repositories/guestRepository')
const ErrorHandler = require('../../../utils/errorHandler')
const bcrypt = require('../../../utils/bcrypt')
const jwt = require('../../../utils/jwt')

const createGuest = async (data) => {
    if (!data) throw new ErrorHandler('Credential not found', 404)
    const { name, username, email, password } = data
    if (data.password !== data.confirmPassword) throw new ErrorHandler('Password Not Match', 401)
    const hashPassword = await bcrypt.hashPassword(password)
    const queryObj = { name, username, email, hashPassword }
    return await guestRepo.createGuest(queryObj)
}

const loginGuest = async (data) => {
    if (!data) throw new ErrorHandler('Credential not found', 404)
    // Validation Query
    const validation = {
        $or: [
            { email: data.field1 },
            { username: data.field1 }
        ]
    }
    // Checking to db from repo
    const guest = await guestRepo.findGuest(validation)
    if (!guest) throw new ErrorHandler('Username or email not found', 404)
    // Checking if password match
    const isMatch = await bcrypt.comparePassword(data.field2, guest[0].hashPassword)
    if (!isMatch) throw new ErrorHandler('Password incorrect', 404)
    // Generate token
    const payloadToken = { name: guest[0].name, username: guest[0].username, email: guest[0].email }
    return jwt.generateToken(payloadToken)
}

const updateProfile = async (data) => {
    
}
module.exports = {
    createGuest,
    loginGuest
}