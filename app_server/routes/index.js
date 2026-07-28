/**
 * Main website routes.
 * Defines the customer-facing routes and maps each request
 * to the corresponding controller action.
 */

const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');

router.get('/', ctrlMain.index);
router.get('/about', ctrlMain.about);
router.get('/rooms', ctrlMain.rooms);
router.get('/meals', ctrlMain.meals);
router.get('/news', ctrlMain.news);
router.get('/contact', ctrlMain.contact);

module.exports = router;
