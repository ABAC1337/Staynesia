const asyncHandler = require('../../../utils/asyncHandler')
const userService = require('../services/user/userService')

const updateProfile = asyncHandler(async (req, res, next) => {
    await userService.updateProfile(req.user.id, req.body)
    return res.status(200).json({
        message: 'Account Updated'
    })
})

const resetPassword = asyncHandler(async (req, res, next) => {
    await userService.resetPassword(req.user.id, req.body)
    return res.status(200).json({
        message: 'Password Updated'
    })
})

const deleteAccount = asyncHandler(async (req, res, next) => {
    await userService.deleteAccount(req.user.id)
    return res.status(200).json({
        message: 'Account Deleted'
    })
})

module.exports = {
    updateProfile,
    resetPassword,
    deleteAccount
}