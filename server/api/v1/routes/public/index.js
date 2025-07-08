const express = require("express");
const router = express.Router();
const listing = require("./listing");
const midtrans = require("./midtrans")
const path = require("path");

router.use("/listing", listing);
router.use("/midtrans", midtrans)
router.use(
  "/upload",
  express.static(path.join(__dirname, "../../../../ListingUploads"))
);

module.exports = router;
