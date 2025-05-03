const apiUser = require('src/routes/api/user')
const express = require('express')
const rootRoutes = express.Router()

rootRoutes.use('/', apiUser)

module.exports = {
    rootRoutes
}