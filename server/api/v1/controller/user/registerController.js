const guestService = require('../../services/guestService')
const hostService = require('../../services/hostService')
const asyncHandler = require('../../../../utils/asyncHandler')

const guestRegister = asyncHandler(async (req, res, next) => {
    const newGuest = await guestService.createGuest(req.body);
    return res.status(201).json({
        status: 'success',
        data: {
            Guest: newGuest
        }
    })
});

const hostRegister = asyncHandler(async (req, res, next) => {
    const newHost = await hostService.createHost(req.body);
    return res.status(201).json({
        status: 'success',
        data: {
            Host: newHost
        }
    })
});


module.exports = {
    guestRegister,
    hostRegister
}