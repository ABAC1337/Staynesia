const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authHandler')
const auth = require('./auth/auth')
const private = require('./private/index')
const public = require('./public/index')

router.get('/', (req, res, next) => {
    res.status(200).json("HALLO GES, WELCOME TO API STAYNESIA BICES")
})
router.use('/auth', auth)
router.use('/private', authMiddleware.authToken, private)
router.use('/public', public)


module.exports = router;
