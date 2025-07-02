const express = require("express");
const router = express.Router();
const listing = require("./listing");
const path = require("path");

router.use("/listing", listing);
router.use(
  "/upload",
  express.static(path.join(__dirname, "../../../../ListingUploads"))
);

module.exports = router;
