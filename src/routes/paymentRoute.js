const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.post('/payment', controllers.payment.sendPayment);

module.exports = router;