const express = require('express');
const router = express.Router();
const controllers = require('../controllers')

router.get('/health', controllers.health.health);

module.exports = router;
