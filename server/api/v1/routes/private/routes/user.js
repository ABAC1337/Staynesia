const express = require('express')
const router = express.Router()
const userController = require('../../../controller/userController')

router.route('/:id')
        .post(userController.resetPassword)
        .patch(userController.updateProfile)
        .delete(userController.deleteAccount)

module.exports = router