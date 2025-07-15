const listingService = require("../services/listingService");
const bookingService = require("../services/bookingService");
const asyncHandler = require("../../../utils/asyncHandler");

const createListing = asyncHandler(async (req, res, next) => {
  const urlImg = req.files.map((item) => item.filename);
  const parse = JSON.parse(req.body.form);
  const hostId = req.user.id;
  await listingService.createListing(hostId, urlImg, parse);
  return res.status(201).json({
    message: "Listing Created",
  });
});

const updateListing = asyncHandler(async (req, res, next) => {
  await listingService.updateListing(req.params.id, req.body);
  return res.status(200).json({
    message: "Listing Updated",
  });
});

const deleteListing = asyncHandler(async (req, res, next) => {
  await listingService.deleteListing(req.params.id);
  return res.status(200).json({
    message: "Listing Deleted",
  });
});

const pagination = asyncHandler(async (req, res, next) => {
  const listing = await listingService.getPagination(req.query);
  return res.status(200).json({
    message: "Success",
    length: listing.length,
    data: listing,
  });
});

const getTopRated = asyncHandler(async (req, res, next) => {
  const listing = await listingService.getTopRated()
  return res.status(200).json({
    message: "Success",
    length: listing.length,
    data: listing
  })
})

const getListingId = asyncHandler(async (req, res, next) => {
  const listing = await listingService.getListingId(req.params.id);
  const booking = await bookingService.getBookedDates(req.params.id);
  return res.status(200).json({
    message: "Success",
    data: listing,
    booked: booking,
  });
});

const getFilterPagination = asyncHandler(async (req, res, next) => {
  const listing = await listingService.getFilterPagination()
  return res.status(200).json({
    message: "Success",
    data: listing
  })
})

module.exports = {
  createListing,
  updateListing,
  deleteListing,
  pagination,
  getListingId,
  getTopRated,
  getFilterPagination
};
