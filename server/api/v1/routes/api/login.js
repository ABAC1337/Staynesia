const express = require('express')
const router = express.Router()
const login = require('../../controller/loginController')

router.post('/login-guest', login.loginGuest)
router.post('/login-host', login.loginHost)

module.exports = router;