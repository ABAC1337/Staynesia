const cron = require('node-cron');
const update = require('./updateStatusBooking')
const emailReminder = require('./emailReminder')

cron.schedule('00 18 * * *', async () => {
    await update.updateBookingStatusAuto()
    await emailReminder.reminderCheckIn()
    await emailReminder.reminderCheckOut()
},{
    timezone: "Asia/Jakarta"
})