const apiUser = require('./api/user')
const express = require('express')
const rootRoutes = express.Router()

rootRoutes.use('/', apiUser)

module.exports = {
    rootRoutes
}