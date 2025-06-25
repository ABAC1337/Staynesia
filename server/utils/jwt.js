const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
}

const verifyToken = (token, SECRET) => {
    return jwt.verify(token, SECRET)
}

module.exports = { generateToken, verifyToken }