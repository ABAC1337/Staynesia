const express = require("express");
const router = express.Router();
const listing = require("./listing");
const midtrans = require("./midtrans")
const multer = require('../../middleware/multer')

router.use("/listing", listing);
router.use("/midtrans", midtrans)
router.use("/upload", multer.upload.array('images', 5), (req, res) => {
  if (!req.files || req.files.length === 0)
    return res.status(404).json('Failed')
  return res.status(200).json('Success')
});

module.exports = router;
