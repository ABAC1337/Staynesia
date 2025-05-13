const guestQueries = require('./queries/guest')
const { comparePassword, hashPassword } = require('../utils/bcrypt')

const updateProfile = async (req, res) => {
    const {
        id,
        name,
        username,
        email,
        photo,
        oldPassword,
        newPassword,
        confirmPassword
    } = req.body // testing
    console.log(id, name, email, photo, oldPassword, newPassword, confirmPassword)
    try {
        const queryObject = {}
        if (name) {
            queryObject.name = name
        }
        if (username) {
            queryObject.username = username
        }
        if (email) {
            queryObject.email = email
        }
        if (photo) {
            queryObject.imageUrl = photo
        }
        if (oldPassword || newPassword || confirmPassword) {
            console.log('1');
            
            const findGuest = await guestQueries.findGuestById(id)
            console.log('2');
            if (!findGuest) {
                return res.status(404).json('Not Found')
            }
            
            const compare = await comparePassword(oldPassword, findGuest.hashPassword)
            console.log('3');
            if (!compare) {
                return res.status(404).json('Miss Match (DB)')
            }

            if (newPassword !== confirmPassword) {
                return res.status(404).json('Miss Match')
            }
            console.log('4');
            const hashed = await hashPassword(newPassword)
            console.log('5');
            queryObject.hashPassword = hashed
        }
        const updated = await guestQueries.updateGuest(id, queryObject)

        if (!updated) {
            return res.status(404).json('Not Found')
        }

        return res.status(200).json('Updated Profile')
    } catch (error) {
        return res.status(400).json(error)
    }
}

const deleteProfile = async (req, res) => {
    const {
        id
    } = req.body // testing

    try {
        if (!id) {
            return res.status(404).json('Not Found')
        }

        const deleted = await guestQueries.deleteGuest(id)

        if (!deleted) {
            return res.status(404).json('Not Found')
        }

        return res.status(200).json('Deleted Profile')
    } catch (error) {
        return res.status(400).json(error)
    }
}


module.exports = {
    updateProfile,
    deleteProfile
}