const express = require('express');
const router = express.Router()
const paymentController = require('../../../controller/paymentController');

router.post('/create', paymentController.createPayment)
router.route('/:id')
    .delete(paymentController.deletePayment)

module.exports = router