const express = require('express')
const router = express.Router()
const guestController = require('../../controller/guestController')

router.post('/update-profile', guestController.updateProfile)
router.post('/delete-profile', guestController.deleteProfile)

module.exports = router;