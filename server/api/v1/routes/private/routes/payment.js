const express = require('express');
const router = express.Router()
const paymentController = require('../../../controller/paymentController');

router.route('/create')
    .post(paymentController.createPayment)

router.route('/:id')
    .patch(paymentController.updatePayment)
    .delete(paymentController.deletePayment)

module.exports = router