const userService = require('../services/user/userService')
const asyncHandler = require('../../../utils/asyncHandler')
const ErrorHandler = require('../../../utils/errorHandler')

const login = asyncHandler(async (req, res, next) => {
    const user = await userService.loginUser(req.body)
    return res.status(200).json({
        message: 'Login Success',
        token: user
    })
})

const register = asyncHandler(async (req, res, next) => {
    await userService.createUser(req.body)
    return res.status(201).json({
        message: 'Account Created'
    })
})

const logout = asyncHandler(async (req, res, next) => {
    if (!req.user) throw new ErrorHandler('User not found', 404)
    req.user = ''
    res.status(200).json({
        message: 'Account has been logged out'
    })

})


module.exports = {
    login,
    register,
    logout
}