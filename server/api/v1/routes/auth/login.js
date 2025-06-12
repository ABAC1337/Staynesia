const express = require('express');
const router = express.Router()
const loginController = require('../../controller/user/loginController')

router.post('/guest', loginController.loginGuest)
router.post('/host', loginController.loginHost)

module.exports = router;