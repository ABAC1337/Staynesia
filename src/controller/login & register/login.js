const bcrypt = require("bcrypt");
const Guest = require("../user/guest")
const Host = require("../user/host")

const payloadLogin = {
    email : req.body.email,
    password : req.body.password,
    role : req.body.role
}

const isMatch = async (password, dbPass) => {
    return await bcrypt.compare(password, dbPass)
}

const loginUser = async (req, res) => {
    try {
        // Checking Credential
        if (payloadLogin === null){
            res.status(400).json('Credential Null or Something Wrong with Interfaces')
        }

        const guest = Guest.findGuestEmail(payloadLogin.email)
        const host = Host.findHostEmail(payloadLogin.email)

        if (guest) {
            const matched = await isMatch(payloadLogin.password, guest.password)
            if (!matched) {
                res.status(401).json("Password Incorrect")
            }
            // Session Stuff
            // res.status(200).redirect('/') -- Redirect to home or maybe guest dashboard 
        }
        else if (host) {
            const matched = await isMatch(payloadLogin.password, host.password)
            if (!matched) {
                res.status(401).json('Password Incorrect')
            }
            // Make Session Stuff
            // res.status(200).redirect('/host') -- Redirect to host dashboard
        }
        else {
            res.status(400).redirect('/') //  Assuming theres no user 
        } 
    } catch (error) {
        res.status(401).json('Unauthorize Account')
    }
}


module.exports = {};