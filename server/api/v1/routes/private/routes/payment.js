const express = require('express');
const router = express.Router()
const paymentController = require('../../../controller/paymentController');

router.post('/create', paymentController.createPayment)
router.post('/update-status', paymentController.updateStatus)
router.route('/:id')
    .patch(paymentController.updatePayment)
    .delete(paymentController.deletePayment)

module.exports = router