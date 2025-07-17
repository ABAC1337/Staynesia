const listingRepo = require("../repositories/listingRepository");
const userRepo = require("../repositories/userRepository");
const ErrorHandler = require("../../../utils/errorHandler");
const date = require('../../../utils/date');

const createListing = async (id, urlImg, data) => {
  if (!data) throw new ErrorHandler("Value not found", 404);
  if (!id) throw new ErrorHandler("Host not found", 404);
  const {
    province,
    city,
    address,
    category,
    title,
    description,
    checkIn,
    checkOut,
    nightTime,
    additional,
    facility,
    capacity,
    price,
  } = data;
  const location = { province, city, address };
  const rules = { checkIn, checkOut, nightTime, additional };
  const hostId = id;
  const queryObj = {
    location,
    category,
    title,
    description,
    rules,
    imgUrl: urlImg,
    facility,
    capacity,
    price,
    hostId,
  };
  const listing = await listingRepo.createListing(queryObj);
  if (!listing) throw new ErrorHandler("Failed to create listing", 400);
  await userRepo.updateUser(hostId, { $addToSet: { listings: listing._id } });
  return listing;
};

const updateListing = async (id, imgUrl, data) => {
  if (!id) throw new ErrorHandler("Listing not found", 404);
  if (!data) throw new ErrorHandler("Value not found", 404);
  const {
    province,
    city,
    address,
    category,
    title,
    description,
    checkIn,
    checkOut,
    nightTime,
    additional,
    facility,
    capacity,
    price,
    isActive
  } = data;
  const location = { province, city, address };
  const rules = { checkIn, checkOut, nightTime, additional };
  const queryObj = {
    location,
    category,
    title,
    description,
    rules,
    imgUrl,
    facility,
    capacity,
    price,
    isActive
  };
  const listing = await listingRepo.updateListing(id, queryObj);
  if (!listing) throw new ErrorHandler("Listing not found", 404);
  return listing;
};

const updateStatusListing = async (id, data) => {
  if (!id) throw new ErrorHandler("Listing not found", 404);
  if (!data) throw new ErrorHandler("Value not found", 404);
  return listingRepo.updateListing(id, { isActive: data.status })
}

const deleteListing = async (id) => {
  if (!id) throw new ErrorHandler("Listing not found", 404);
  const listing = await listingRepo.deleteListing(id);
  if (!listing) throw new ErrorHandler("Listing not found", 404);
  return listing;
};

const getPagination = async (params) => {
  const { province, city, category, capacity, priceMin, priceMax,
    checkIn, checkOut, facility, sort, page, limit } = params;

  const optionsObj = {};
  const filterObj = {};

  if (province || city) {
    if (province) filterObj["location.province"] = province;
    if (city) filterObj["location.city"] = city;
  }
  if (priceMin && priceMax) {
    const priceMinParse = parseInt(priceMin)
    const priceMaxParse = parseInt(priceMax)
    filterObj.price = { $gte: priceMinParse, $lte: priceMaxParse }
  }
  if (checkIn && checkout) {
    const checkInDate = date.converter(checkIn)
    const checkOutDate = date.converter(checkOut)
    const range = date.range(checkInDate, checkOutDate)
    filterObj.bookedDate = { $not: { $elemMatch: { $in: range } } }
  }
  if (category) {
    const categories = category.split(",").map((c) => c.trim());
    filterObj.category = categories;
  }
  if (facility) {
    const facilities = facility.split(",").map((f) => f.trim());
    filterObj.facility = { $all: facilities };
  }
  if (capacity) {
    const capacityParse = parseInt(capacity)
    filterObj.capacity = { $gte: capacityParse };
  }
  filterObj.isActive = true;
  if (sort) {
    const sortBy = String(sort).split(",").join(" ");
    optionsObj.sort = sortBy ? sortBy : "createdAt";
  }
  // Pagination Logic
  const currentPage = parseInt(page) * 1 || 1;
  optionsObj.limit = limit;
  optionsObj.skip = (currentPage - 1) * optionsObj.limit;
  optionsObj.select =
    "title category location.city location.province imgUrl price rating numRating";
  const queryObj = {
    filterObj: filterObj,
    optionsObj: optionsObj,
  };
  const listing = await listingRepo.findListing(queryObj);
  const totalListing = await listingRepo.countListing(filterObj)
  const totalPage = Math.ceil(totalListing / optionsObj.limit)
  return {
    currentPage: currentPage,
    totalPag: totalPage,
    data: listing,
    total: totalListing
  };
};

const getFilterPagination = async () => {
  const optionsObj = {
    select: '-_id category facility price'
  }
  const queryObj = { optionsObj }
  const listings = await listingRepo.findListing(queryObj)

  const categorySet = new Set();
  const facilitySet = new Set();
  let maxPrice = 0;
  let minPrice = Infinity;

  listings.forEach((listing) => {
    if (Array.isArray(listing.category)) {
      listing.category.forEach(cat => categorySet.add(cat));
    } else if (listing.category) {
      categorySet.add(listing.category);
    }

    if (Array.isArray(listing.facility)) {
      listing.facility.forEach(fac => facilitySet.add(fac));
    } else if (listing.facility) {
      facilitySet.add(listing.facility);
    }

    if (typeof listing.price === 'number') {
      if (listing.price > maxPrice) maxPrice = listing.price;
      if (listing.price < minPrice) minPrice = listing.price;
    }
  });

  return {
    categories: Array.from(categorySet),
    facilities: Array.from(facilitySet),
    maxPrice,
    minPrice
  };
}

const getTopRated = async () => {
  const optionsObj = {
    select: "title category location.city location.province price imgUrl rating numRating",
    sort: '-rating -numRating',
    limit: 10
  }
  const queryObj = { optionsObj }
  return await listingRepo.findListing(queryObj)
}

const getListingId = async (id) => {
  if (!id) throw new ErrorHandler("Listing not found", 404);
  const filterObj = {};
  const optionsObj = {
    populate: [
      {
        path: "hostId",
        select: "name createdAt",
      },
      {
        path: "reviews",
        select: "rating reviewText",
        populate: {
          path: "userId",
          select: "name createdAt",
        },
      },
    ],
    select: "-createdAt -updatedAt -wishlists -bookings",
  };
  filterObj._id = id;
  const queryObj = {
    filterObj: filterObj,
    optionsObj: optionsObj,
  };
  const listing = await listingRepo.findListing(queryObj);
  if (!listing) throw new ErrorHandler("Listing not found", 404);
  return listing;
};

module.exports = {
  createListing,
  updateListing,
  updateStatusListing,
  deleteListing,
  getPagination,
  getListingId,
  getTopRated,
  getFilterPagination
};
