const express = require('express');
const router = express.Router()
const registerController = require('../../controller/user/registerController') 

router.post('/guest', registerController.guestRegister)
router.post('/host', registerController.hostRegister)

module.exports = router;