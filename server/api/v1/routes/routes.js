const express = require('express')
const router = express.Router()
const auth = require('./auth')
const listing = require('./listing')

router.use('/auth', auth)
router.use('/listing', listing)

module.exports = router;
