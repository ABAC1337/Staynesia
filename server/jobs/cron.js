const cron = require('node-cron');
const update = require('./updateStatusBooking')
const emailReminder = require('./emailReminder')

cron.schedule('28 19 * * *', async () => {
    // await update.checkInvalidBookings()
    await update.updateBookingStatusAuto()
    // await emailReminder.reminderCheckIn()
    // await emailReminder.reminderCheckOut()
})