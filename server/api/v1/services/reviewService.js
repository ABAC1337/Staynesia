const reviewRepo = require('../repositories/reviewRepository')
const ErrorHandler = require('../../../utils/errorHandler') 

const createReview = async (data) => {
    if (!data) throw new ErrorHandler('Value not found', 404)
    return await reviewRepo.createReview(data)
}

const updateReview = async (data) => {
    if (!data.id) throw new ErrorHandler('Data Not Found', 404)
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