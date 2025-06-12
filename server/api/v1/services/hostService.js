const hostRepo = require('../repositories/hostRepository')
const ErrorHandler = require('../../../utils/errorHandler')
const bcrypt = require('../../../utils/bcrypt') 
const jwt = require('../../../utils/jwt')

const createHost = async (data) => {
    if (!data) throw new ErrorHandler('Value not found', 404)
    if (data.password !== data.confirmPassword) throw new ErrorHandler('Password Not Match', 401)
    const hashedPassword = await bcrypt.hashPassword(data.password)
    const queryObj = {
        name: data.name,
        username: data.username,
        email: data.email,
        hashPassword: hashedPassword
    }
    return await hostRepo.createHost(queryObj)
}

const loginHost = async (data) => {
    if (!data) throw new ErrorHandler('Credential not found', 404)
    // Validation Query (Array)
    const validation = {
        $or: [
            { email: data.field1 },
            { username: data.field1 }
        ]
    }
    // Checking to db from repo
    const host = await guestRepo.findGuest(validation)
    if (!host) throw new ErrorHandler('Username or email not found', 404)
    // Checking if password match
    const isMatch = await bcrypt.comparePassword(data.field2, host[0].hashPassword)
    if (!isMatch) throw new ErrorHandler('Password incorrect', 404)
    // Generate token
    const payloadToken = { name: host[0].name, username: host[0].username, email: host[0].email }
    return jwt.generateToken(payloadToken)
}

module.exports = {
    createHost,
    loginHost
}