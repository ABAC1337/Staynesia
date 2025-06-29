const listingService = require("../services/listingService");
const bookingService = require("../services/bookingService");
const asyncHandler = require("../../../utils/asyncHandler");

const createListing = asyncHandler(async (req, res, next) => {
<<<<<<< HEAD
  const urlImg = req.files.map((item) => item.filename);
  const parse = JSON.parse(req.body.form);
  const hostId = req.user.id;
  console.log(parse);
  
  const listing = await listingService.createListing(parse, urlImg, hostId);

  return res.status(201).json({
    message: "Listing Created",
  });
});

const updateListing = asyncHandler(async (req, res, next) => {
  const listing = await listingService.updateListing(req.params.id, req.body);
  return res.status(200).json({
    message: "Listing Updated",
  });
});

const deleteListing = asyncHandler(async (req, res, next) => {
  const listing = await listingService.deleteListing(req.params.id);
  return res.status(200).json({
    message: "Listing Deleted",
  });
});
=======
    await listingService.createListing(req.user.id, req.body)
    return res.status(201).json({
        message: "Listing Created"
    });
});

const updateListing = asyncHandler(async (req, res, next) => {
    await listingService.updateListing(req.user.id, req.body)
    return res.status(200).json({
        message: "Listing Updated"
    });
})

const deleteListing = asyncHandler(async (req, res, next) => {
    await listingService.deleteListing(req.user.id)
    return res.status(200).json({
        message: "Listing Deleted"
    })
})
>>>>>>> 6a27cfd830d22591018326d0d30b2e4ab90bed14

const pagination = asyncHandler(async (req, res, next) => {
  const listing = await listingService.getPagination(req.query);
  return res.status(200).json({
    message: "Success",
    length: listing.length,
    data: listing,
  });
});

const getListingId = asyncHandler(async (req, res, next) => {

  const listing = await listingService.getListingId(req.params.id);
  const booking = await bookingService.getBookedDates(req.params.id);
  return res.status(200).json({
    message: "Success",
    data: listing,
    booked: booking,
  });
});

module.exports = {
  createListing,
  updateListing,
  deleteListing,
  pagination,
  getListingId,
};
