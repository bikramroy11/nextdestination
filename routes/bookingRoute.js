const express = require('express');
const router = express.Router({ mergeParams: true });
const bookingController = require('../controllers/bookingController');
const { isLoggedIn } = require('../middleware');
const asyncWrap = require('../utils/asyncWrap');

// POST: Create booking
router.post('/', isLoggedIn, asyncWrap(bookingController.createBooking));

module.exports = router;
