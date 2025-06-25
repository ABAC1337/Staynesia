const express = require('express')
const router = express.Router()
const userController = require('../../../controller/userController')

router.route('/')
        .post(userController.resetPassword)
        .patch(userController.resetPassword)
        .delete(userController.deleteAccount)

module.exports = router