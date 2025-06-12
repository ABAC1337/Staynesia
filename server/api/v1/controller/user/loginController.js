const guestService = require('../../services/guestService')
const hostService = require('../../services/hostService')
const asyncHandler = require('../../../../utils/asyncHandler');
const ErrorHandler = require('../../../../utils/errorHandler');

const loginGuest = asyncHandler(async (req, res, next) => {
    const guest = await guestService.loginGuest(req.body);
    if (!guest) throw new ErrorHandler('Login not valid', 400)
    
    return res.status(200).json({
        status: 'success',
        token: guest
    });
});

const loginHost = asyncHandler(async (req, res, next) => {
    const host = await hostService.loginHost(req.body);
    if (!host) throw new ErrorHandler('Login not valid', 400)
    
    return res.status(200).json({
        status: 'success',
        token: host
    })
});

module.exports = {
    loginGuest,
    loginHost
}