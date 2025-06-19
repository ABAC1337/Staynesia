const express = require("express");
const router = express.Router();
const listingController = require("../../controller/listingController");
const upload = require("../../middleware/multer");

router.post("/create",
  upload.array("listingImg", 10),
  listingController.createListing
);

router.route('/:id')
  .patch(listingController.updateListing)
  .delete(listingController.deleteListing)

module.exports = router;
