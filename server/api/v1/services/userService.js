const userRepo = require('../repositories/userRepository')
const ErrorHandler = require('../../../utils/errorHandler')
const bcrypt = require('../../../utils/bcrypt')
const jwt = require('../../../utils/jwt')

const createUser = async (data) => {
    if (!data) throw new ErrorHandler('Credential not found', 404)
    const { name, username, email, password, confirmPassword, role } = data
    if (password !== confirmPassword)
        throw new ErrorHandler('Password Not Match', 401)
    const hashPassword = await bcrypt.hashPassword(password)
    const queryObj = { name, username, email, hashPassword, role }
    return await userRepo.createUser(queryObj)
}

const loginUser = async (data) => {
    if (!data) throw new ErrorHandler('Credential not found', 404)
    // Validation Query
    const validation = {
        $or: [
            { email: data.field1 },
            { username: data.field1 }
        ]
    }
    // Checking to db from repo
    const user = await userRepo.findUser(validation)

    if (!user[0] || user[1])
        throw new ErrorHandler('Username or email not found', 404)
    // Checking if password match
    const isMatch = await bcrypt.comparePassword(data.field2, user[0].hashPassword)
    if (!isMatch)
        throw new ErrorHandler('Password incorrect', 404)
    // Generate token
    const payloadToken = { name: user[0].name, username: user[0].username, email: user[0].email }
    return jwt.generateToken(payloadToken)
}

const updateProfile = async (data) => {
    if (!data || !data.id) 
        throw new ErrorHandler('Credential not found', 404)
    const { id, username, name, email, password } = data
    queryObj = {}

    if (username)
        queryObj.username = username
    if (name)
        queryObj.name = name
    if (email)
        queryObj.email = email
    return await userRepo.updateUser(id, queryObj)
}
module.exports = {
    createUser,
    loginUser,
    updateProfile
}