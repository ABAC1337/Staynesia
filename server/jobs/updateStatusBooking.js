const DB = require('../models/schema')

const updateBookingStatusAuto = async () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (isNaN(today.getTime())) {
        return {
            success: false,
            message: 'Invalid Date for today'
        };
    }

    try {
        const booking = await DB.Booking.updateMany(
            {
                bookingStatus: 'confirmed',
                checkOut: { $gte: today }
            },
            {
                $set: { bookingStatus: 'success' }
            }
        )
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

const checkInvalidBookings = async () => {
    const bookings = await DB.Booking.find({});
    const invalid = bookings.filter(b => {
        return !(b.checkIn instanceof Date) || isNaN(b.checkIn.getTime());
    });

    console.log(`Found ${invalid.length} invalid bookings`);
    invalid.forEach(b => {
        console.log({
            _id: b._id,
            checkIn: b.checkIn
        });
    });
};

module.exports = { updateBookingStatusAuto, checkInvalidBookings } 