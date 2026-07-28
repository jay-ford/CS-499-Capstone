/**
 * Travel page routes.
 * Defines the customer-facing travel route and maps the request
 * to the corresponding controller action.
 */

const express = require('express');
const router = express.Router();
const ctrlTravel = require('../controllers/travel');

router.get('/', ctrlTravel.travel);

module.exports = router;