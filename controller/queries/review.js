const DB = require('../../db/schema')

const createReview = async (guestId, listingId, rating, reviews) => {
    return await DB.Review.create({
        guestId : guestId,
        listingId : listingId,
        rating : rating,
        reviews : reviews
    })
}

const getAllReviewByListingId = async (id) => {
    return await DB.Review.find({
        listingId : id
    })
}

const updateReview = async (id, rating, reviews) => {
    return await DB.Review.findByIdAndUpdate({
        _id : id
    },{
        rating : rating,
        reviews : reviews
    })
}

const deleteReview = async (id) => {
    return await DB.Review.findByIdAndDelete(id)
}

module.exports = {
    createReview,
    getAllReviewByListingId,
    updateReview,
    deleteReview
}
