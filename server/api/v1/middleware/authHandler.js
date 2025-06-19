const asyncHandler = require('../../../utils/asyncHandler')
const ErrorHandler = require('../../../utils/errorHandler')
const jwt = require('../../../utils/jwt')
const errorHandler = require('./errorHandler')

const authToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.header['Authorization']
    console.log(authHeader);
    
    const getToken = authHeader && authHeader.split(' ')[1]
    console.log(getToken);
    
    if (getToken == null) throw new ErrorHandler('Failed to get token', 403)
    
    const decode = jwt.verifyToken(getToken, process.env.JWT_SECRET)
    if (!decode) throw new errorHandler('Failed to authenticate', 403)
    next()
})

module.exports = authToken
