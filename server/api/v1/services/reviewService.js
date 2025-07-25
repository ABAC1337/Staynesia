const reviewRepo = require('../repositories/reviewRepository')
const userRepo = require('../repositories/userRepository')
const listingRepo = require('../repositories/listingRepository')
const ErrorHandler = require('../../../utils/errorHandler')

const createReview = async (userId, data) => {
    if (!data) throw new ErrorHandler('Value not found', 404)
    if (!userId) throw new ErrorHandler('User not found', 404)
    const payload = {
        rating: data.rating,
        reviewText: data.message,
        userId: userId,
        listingId: data.listingId
    }
    const review = await reviewRepo.createReview(payload)
    const calculate = await reviewRepo.calculationReview(review.listingId)
    const { rating, numRating } = calculate[0]
    const update = {
        $addToSet: { reviews: review._id, },
        rating: rating,
        numRating: numRating
    }
    if (!review) throw new ErrorHandler('Failed to create review', 400)
    await Promise.all([
        listingRepo.updateListing(review.listingId, update),
        userRepo.updateUser(review.userId, { $addToSet: { reviews: review._id } })
    ])
    return review
}

const updateReview = async (data) => {
    if (!data.id) throw new ErrorHandler('Data Not Found', 404)
    return await reviewRepo.updateReview(query)
}

const deleteReview = async (id) => {
    if (!id)
        throw new ErrorHandler('Data Not Found', 404)
    const review = await reviewRepo.findReviewById(id)
    await Promise.all([
        listingRepo.updateListing(review.listingId, { $pull: { reviews: review._id, } }),
        userRepo.updateUser(review.userId, { $pull: { reviews: review._id } })
    ])
    return await reviewRepo.deleteReview(id)
}


module.exports = {
    createReview,
    updateReview,
    deleteReview,
}