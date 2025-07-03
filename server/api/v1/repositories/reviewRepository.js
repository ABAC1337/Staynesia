const DB = require('../../../models/schema')

const createReview = async (data) => {
    return await DB.Review.create(data)
}

const findReviewById = async (id) => {
    return await DB.Review.findById(id)
}

const updateReview = async (id, data) => {
    return await DB.Review.findByIdAndUpdate(id, data)
}

const deleteReview = async (id) => {
    return await DB.Review.findByIdAndDelete(id)
}

const calculationReview = async (id) => {
    return await DB.Review.aggregate([
        { $match: { listingId: new DB.mongoose.Types.ObjectId(id) } },
        {
            $group: {
                _id: "$listingId",
                rating: { $avg: '$rating' },
                numRating: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                rating: 1,
                numRating: 1
            }
        }
    ])
}

module.exports = {
    createReview,
    findReviewById,
    updateReview,
    deleteReview,
    calculationReview
}