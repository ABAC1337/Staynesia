const express = require('express')
const router = express.Router()
const listing = require('./listing')

router.use('/listing', listing)

module.exports = router