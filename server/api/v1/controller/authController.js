const userService = require('../services/userService')
const asyncHandler = require('../../../utils/asyncHandler')

const login = asyncHandler(async (req, res, next) => {
    const user = await userService.loginUser(req.body)
    return res.status(200).json({
        message: 'Login Success',
        token: token
    })
})

const register = asyncHandler(async (req, res, next) => {
    const user = await userService.createUser(req.body)
    return res.status(201).json({
        message: 'Account Created'
    })
}) 

module.exports = {
    login,
    register
}