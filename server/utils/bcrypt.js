const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const saltRound = 10
    return await bcrypt.hash(password, saltRound)
}

const comparePassword = async (password, dbPass) => {
    return await bcrypt.compare(password, dbPass)
}

module.exports = {
    hashPassword,
    comparePassword
};