const express = require('express');
const router = express.Router()
const auth = require('../../middleware/authHandler')
const authController = require('../../controller/authController')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/request-forgot', authController.tokenForgotPass)
router.post('/verify-otp', auth.authForgotPassword, authController.verifyOTP)
router.post('/forgot-password', auth.authForgotPassword, authController.forgotPassword)

module.exports = router