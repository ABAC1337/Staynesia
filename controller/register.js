const bcrypt = require("bcrypt");
const Guest = require('./user/guest')
const Host = require('./user/host')

const payloadRegister = {
    name : req.body.name,
    email : req.body.email,
    password : req.body.password,
    confirmPass : req.body.confirmPass,
    role : req.body.role
}

const hashPass = async (x) => {
    const saltRound = 10
    return await bcrypt.hash(x, saltRound)
}

const isMatch = (pass, confirmPass) => {
    if (pass != confirmPass) {
        res.status(400).json('Password Miss Match') 
    }
    return res.status(200).json('Password Match')
}   

const guestRegister = async() =>{
    try {
        // Check Credential
        if (!payloadRegister) {
            res.status(400).json('Credential Null or Something Wrong with Interfaces')
        }
        isMatch(payload.password, payload.confirmPass)

        const isExist = Guest.emailExist(payloadRegister.email)
        if(isExist){
            res.status(400).json('Account is Exist') // notification pop out
        }

        const encrypt = hashPass(payloadRegister.password)
        const created = Guest.createGuest(payload.name, payload.email, encrypt)
        if(!created) {
            res.status(400).json('Account was not created')
        }
        
        return res.status(200).json('Account has been created, enjoy')
    } catch (error) {
        res.status(400).json('error ngab')
    }
}

const hostRegister = async() =>{
    try {
        // Check Credential
        if (!payloadRegister) {
            res.status(400).json('Credential Null or Something Wrong with Interfaces')
        }
        isMatch(payload.password, payload.confirmPass)

        const isExist = Host.emailExist(payloadRegister.email)
        if(isExist){
            res.status(400).json('Account is Exist') // notification pop out
        }

        const encrypt = hashPass(payloadRegister.password)
        const created = Host.createGuest(payload.name, payload.email, encrypt)
        if(!created) {
            res.status(400).json('Account was not created')
        }
        return res.status(200).json('Account has been created, enjoy')
    } catch (error) {
        res.status(400).json('')
    }
}

module.exports = {}; 