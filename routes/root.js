const express = require('express')
const rootRoutes = express.Router()

const listingRoute = require('./api/listing')
const guestRoute = require('./api/guest')
const registerRoute = require('./api/register')
const loginRoute = require('./api/login')

rootRoutes.get('/', (req, res) => {
    res.send('Staynesia Api')
})

rootRoutes.use('/', registerRoute)
rootRoutes.use('/', loginRoute)
rootRoutes.use('/', guestRoute)
rootRoutes.use('/', listingRoute)

module.exports = {
    rootRoutes
}