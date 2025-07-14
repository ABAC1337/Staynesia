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

const tokenForgotPass = asyncHandler(async (req, res, next) => {
    const token = await userService.forgotPasswordToken(req.body)
    res.status(200).json({
        message: 'Email Verified',
        data: token
    })
})

const verifyOTP = asyncHandler(async (req, res, next) => {
    const valid = await userService.verifyOTP(req.reset, req.body)
    if (valid === false) {
        throw new ErrorHandler('OTP was not valid', 403)
    }
    return res.status(200).json({
        message: 'OTP Verified'
    })
})

const forgotPassword = asyncHandler(async (req, res, next) => {
    await userService.forgotPassword(req.reset, req.body)
    return res.status(200).json({
        message: 'Password Was Changed'
    })
})

module.exports = {
    login,
    register,
    logout,
    tokenForgotPass,
    verifyOTP,
    forgotPassword
}