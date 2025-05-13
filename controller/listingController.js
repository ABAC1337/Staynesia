const listingQueries = require('./queries/listing')

const topSales = async (req, res) => {
    try {
        const listings = await listingQueries.getListingsBySales()
        if (!listings) {
            res.status(404).json('Listing Not Found')
        }

        return res.status(200).json(listings)
    } catch (error) {
        res.status(400).json(error)
    }
}

const mostAffordable = async (req, res) => {
    try {
        const listings = await listingQueries.getListingsByAfford()
        if (!listings) {
            res.status(404).json('Listing Not Found')
        }

        return res.status(200).json(listings)
    } catch (error) {
        res.status(400).json(error)
    }
}

const topRating = async (req, res) => {
    try {
        const listings = await listingQueries.getListingsByRatings()
        if (!listings) {
            res.status(404).json('Listing Not Found')
        }

        return res.status(200).json(listings)
    } catch (error) {
        res.status(400).json(error)
    }
}

const pagination = async (req, res) => {
    const {
        page,
        sortBy, 
        province,
        city,
        category,
        facility,
        capacity,
        price,
        rating
    } = req.query
    console.log(req.query);
    try {
        if(!req.query){
            return res.status(404).json('Not Found')
        }
        
        const queryObject = {}
        let sorted
        // Filtered Numeric Logic
            // Notes 
            // add price range
            // add rating range
            // we'll do later
            // $gt $lt $eq $gte $lte
            // convert to numeric
        
        // Filtered Text
        const location = {
            province,
            city
        }

        if (location) {
            queryObject.location = { $regex: location, $options: "i" }
        }

        if (category) {
            queryObject.category = { $regex: category, $options: "i" }
        }

        if (facility) {
            queryObject.facility = { $regex: facility, $options: "i" }
        }

        // Sorted By -price(desc) price(asc)
        if (sortBy) {
            sorted = sortBy.split(",").join(" ")
        }

        // Limit for pagination
        const limit = 16
        
        // Call Function
        const filtered = await listingQueries.getListingsByPagination(page, limit, queryObject, sorted)

        if (!filtered) {
            return res.status(404).json('Not Found')
        }
        return res.status(200).json(filtered)
    } catch (error) {
        res.status(400).json(error)
    }
}

const createListing = async (req, res) => {
    const {
        province,
        city,
        category, 
        title, 
        description, 
        imgUrl, 
        facility, 
        capacity, 
        price, 
        hostId
    } = req.body
    try {
        if (!req.body){
            return res.status(404).json('Not Found')
        }

        const location = {
            province,
            city
        }
        
        const created = await listingQueries.createListings(
        location, 
        category, 
        title, 
        description, 
        imgUrl, 
        facility, 
        capacity, 
        price, 
        hostId)

        if(!created) {
            return res.status(404).json('Not Found')
        }
        return res.status(200).json(created)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const updateListing = async (req, res) => {
    const {
        id,
        province,
        city,
        category, 
        title, 
        description, 
        imgUrl, 
        facility, 
        capacity, 
        price, 
        hostId
    } = req.body
    try {
        if (!req.body) {
            return res.status(404).json('Not Found')
        }

        const location = {
            province,
            city
        }

        const updated = await listingQueries.updateListings(
        id, 
        location, 
        category, 
        title, 
        description, 
        imgUrl, 
        facility, 
        capacity, 
        price, 
        hostId
        )

        if(!updated) {
            return res.status(404).json('Not Found')
        }
        return res.status(200).json(updated)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const deleteListing = async (req, res) => {
    const {
        id
    } = req.body
    try {
        if (!req.body) {
            return res.status(404).json('Not Found')
        }

        const deleted = await listingQueries.deleteListing(id)

        if(!deleted) {
            return res.status(404).json('Not Found')
        }
        return res.status(200).json(deleted)
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    topSales,
    topRating,
    mostAffordable,
    createListing,
    updateListing,
    deleteListing,
    pagination
}