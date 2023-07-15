const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.post('/.well-known/apple-developer-merchantid-domain-association', controllers.merchantValidation.getDomainVerificationFile);

module.exports = router;