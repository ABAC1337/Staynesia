const reviewRepo = require('../repositories/reviewRepository')
const ErrorHandler = require('../../../utils/errorHandler')

const createReview = async (guestId, listingId, rating, reviewText) => {
    const query = { guestId, listingId, rating, reviewText}
    if (!query)
        throw new ErrorHandler('Data Not Found', 404)
    return await reviewRepo.createReview(query)
}

const updateReview = async (id, rating, reviewText) => {
    const query = {id, rating, reviewText}
    if (!query)
        throw new ErrorHandler('Data Not Found', 404)
    return await reviewRepo.updateReview(query)
}

const deleteReview = async (id) => {
    if (!id) 
        throw new ErrorHandler('Data Not Found', 404)
    return await reviewRepo.deleteReview(id)
}

module.exports = {
    createReview,
    updateReview,
    deleteReview
}