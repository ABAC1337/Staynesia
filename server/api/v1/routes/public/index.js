const express = require("express");
const router = express.Router();
const listing = require("./listing");
const midtrans = require("./midtrans")

router.use("/listing", listing);
router.use("/midtrans", midtrans)

module.exports = router;
