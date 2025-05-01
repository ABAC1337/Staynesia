const express = require('express')
const router = express.Router()
const createGuest = require('../../controller/user/guest')

router.get('/api', (req, res) => {
    res.send('API Test')
})

router.post('/api/register', (req, res) => {
    const created = createGuest.createGuest('niko', 'email', 'password')
    if (!created) {
        res.status(400).json('Account was not created')
    }
    return res.status(200).json('Account has been created, enjoy')
})

module.exports = router;