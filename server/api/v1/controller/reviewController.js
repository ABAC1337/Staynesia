const asyncHandler = require('../../../utils/asyncHandler')
const reviewService = require('../services/reviewService')

const createReview = asyncHandler(async (req, res, next) => {
    await reviewService.createReview(req.user.id, req.body)
    return res.status(201).json({
        message: 'Review created',
    })
})

const updateReview = asyncHandler(async (req, res, next) => {
    await reviewService.updateReview(req.params.id, req.body)
    return res.status(200).json({
        message: 'Review updated',
    })
})

const deleteReview = asyncHandler(async (req, res, next) => {
    await reviewService.deleteReview(id)
    return res.status(200).json({
        message: 'Review deleted'
    })
})

module.exports = {
    createReview,
    updateReview,
    deleteReview,
}

