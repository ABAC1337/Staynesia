const bookingQueries = require('./queries/booking')

const createBookings = async (req, res) => {
    try {
        const payload = {
            guestId,
            listingId,
            checkIn,
            checkOut,
            totalPrice,
            statusBooking
        } = req.body

        if (!payload) {
            return res.status(404).json('Payload Null')
        }

        const create = await bookingQueries.createBookings(payload.guestId, payload.listingId, payload.checkIn, payload.checkOut, payload.totalPrice, payload.statusBooking)

        if (!create) {
            return res.status(404).json('Not Creating')
        }

        return res.status(200).json(create)
    } catch (error) {
        return res.status(404).json(error)
    }
}

const updateBookings = async (req, res) => {
    try {
        const payload = {
            id,
            checkIn,
            checkOut,
            totalPrice,
        } = req.body

        if (!payload) {
            return res.status(404).json('Payload Null')
        }

        const update = await bookingQueries.updateBookings(payload.id, payload.checkIn, payload.checkOut, payload.totalPrice)

        if (!update) {
            return res.status(404).json('Not Updating')
        }

        return res.status(200).json(update)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const updateStatusBooking = async (req, res) => {
    try {
        const payload = {
            id,
            statusBooking
        } = req.body

        if (!statusBooking) {
            return res.status(404).json('Not Found')
        }

        const update = await bookingQueries.updateStatusBooking(payload.id, payload.statusBooking)

        if (!update) {
            res.status(404).json('Not Updating')
        }

        return res.status(200).json(update)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const deleteBookings = async (req, res) => {
    try {
        const id = req.body.id

        if (!id) {
            return res.status(404).json('Not Found')
        }

        const deleted = await bookingQueries.deleteBookings(id)

        if (!deleted) {
            return res.status(404).json('Not Deleting')
        }

        return res.status(200).json(deleted)
    } catch (error) {
        return res.status(400).json(error)
    }
}



module.exports = {
    createBookings,
    updateBookings,
    updateStatusBooking,
    deleteBookings,
}