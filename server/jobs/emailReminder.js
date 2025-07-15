const DB = require('../models/schema')
const mailer = require('../utils/mailer')

const reminderCheckIn = async () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const booking = await DB.Booking.find({
        checkIn: tomorrow
    }).populate('userId')

    return await Promise.all(
        booking.map(b =>
            mailer.sendEmail(b.userId.email, "Reminder Check Out", "Woy besok jangan lupa check in"))
    )
}

const reminderCheckOut = async () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const booking = await DB.Booking.find({
        checkOut: tomorrow
    }).populate('userId')

    return await Promise.all(
        booking.map(b =>
            mailer.sendEmail(b.userId.email, "Reminder Check Out", "Woy besok check out jir"))
    )
}

module.exports = { reminderCheckIn, reminderCheckOut }