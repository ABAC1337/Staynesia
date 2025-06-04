const express = require('express')
const router = express.Router()
const register = require('../../controller/registerController')

router.post('/register-guest', register.guestRegister)
router.post('/register-host', register.hostRegister)

module.exports = router;