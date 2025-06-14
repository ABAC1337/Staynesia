const DB = require('../../../models/schema')

const createListing = async (query) => {
    return await DB.Listing.create(query, {new: true, runValidation: true});
}

const findListingById = async (id) => {
    return await DB.Listing.aggregate([
        { $match: { _id: id } },
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'listingId',
                as: 'reviews'
            }
        },
        {
            $unwind: {
                path: '$reviews',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'guests',
                localField: 'reviews.guestId',
                foreignField: '_id',
                as: 'reviews.guest'
            }
        },
        {
            $unwind: {
                path: '$reviews.guest',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $addFields: {
                'reviews.guest.accountAgeDays': {
                    $dateDiff: {
                        startDate: '$reviews.guest.createdAt',
                        endDate: '$$NOW',
                        unit: 'day'
                    }
                }
            }
        },
        {
            $group: {
                _id: '$_id',
                location: { $first: '$location' },
                category: { $first: '$category' },
                title: { $first: '$title' },
                description: { $first: '$description' },
                rules: { $first: '$rules' },
                imgUrl: { $first: '$imgUrl' },
                facility: { $first: '$facility' },
                capacity: { $first: '$capacity' },
                price: { $first: '$price' },
                hostId: { $first: '$host' },
                reviews: { $push: '$reviews' }
            }
        },
        {
            $addFields: {
                avgRating: { $avg: '$reviews.rating' },
                numReviews: {
                    $size: {
                        $filter: {
                            input: '$reviews',
                            as: 'r',
                            cond: { $ne: ['$$r.rating', null] }
                        }
                    }
                }
            }
        },
        {
            $lookup: {
                from: 'hosts',
                localField: 'hostId',
                foreignField: '_id',
                as: 'host'
            }
        },
        {
            $addFields: {
                'host.accountAgeDays': {
                    $dateDiff: {
                        startDate: '$host.createdAt',
                        endDate: '$$NOW',
                        unit: 'day'
                    }
                }
            }
        },
    ]);
}

const findListing = async (queryObj) => {
    const { filter, sort, skip, limit } = queryObj
    return await DB.Listing.aggregate([
        { $match: filter },
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'listingId',
                as: 'reviews'
            }
        },
        { $unwind: { path: '$reviews', preserveNullAndEmptyArrays: true } },
        {
            $group: {
                _id: '$_id',
                location: { $first: '$location' },
                title: { $first: '$title' },
                price: { $first: '$price' },
                avgRating: {
                    $avg: {
                        $cond: [{ $gt: ['$reviews.rating', 0] }, '$reviews.rating', '$$REMOVE']
                    }
                },
                numReviews: {
                    $sum: {
                        $cond: [{ $ne: ['$reviews.rating', null] }, 1, 0]
                    }
                }
            }
        },
        { $sort: sort },
        { $skip: skip },
        { $limit: limit },
    ]);
}

const updateListing = async (id, query) => {
    return await DB.Listing.findByIdAndUpdate(id, query, {runValidation: true})
}

const deleteListing = async (id) => {
    return await DB.Listing.findByIdAndDelete(id)
}

module.exports = {
    createListing,
    findListingById,
    findListing,
    updateListing,
    deleteListing
}