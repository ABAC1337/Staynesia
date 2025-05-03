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
    }).sort({
        rating : {
            $gte : 5
        }
    })
}



