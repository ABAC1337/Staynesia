const express = require('express');
const router = express.Router()
const reviewController = require('../../controller/reviewController')

router.route('/')
    .post(reviewController.createReview)

router.route('/:id')
    .patch(reviewController.updateReview)
    .delete(reviewController.deleteReview)

module.exports = router