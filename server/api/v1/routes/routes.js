const express = require('express')
const router = express.Router()
const auth = require('./auth/index')
// const private = require('./private')
// const public = require('./public')

router.use('/auth', auth)


module.exports = router;
