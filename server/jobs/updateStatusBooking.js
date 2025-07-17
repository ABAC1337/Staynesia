const DB = require('../models/schema')

const updateBookingStatusAuto = async () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    try {
        const booking = await DB.Booking.updateMany(
            {
                bookingStatus: 'confirmed',
                checkOut: { $lt: today }
            },
            {
                $set: { bookingStatus: 'success' }
            }
        )
        console.log(booking);
        return {
            success: true,
            message: 'Update booking status success',
            data: booking
        }
    } catch (error) {
        return {
            success: false,
            message: 'Failed to update booking status.',
            error: error.message || error
        }
    }
}

module.exports = { updateBookingStatusAuto } 