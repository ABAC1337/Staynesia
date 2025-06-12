const DB = require('../../../models/schema')

const createReview = async (query) => {
    return await DB.Review.create(query)
}

const updateReview = async (query) => {
    return await DB.Review.findByIdAndUpdate(query)
}

const deleteReview = async (id) => {
    return await DB.Review.findByIdAndDelete(id)
}

module.exports = {
    createReview,
    findReviewById,
    findReview,
    updateReview,
    deleteReview
}