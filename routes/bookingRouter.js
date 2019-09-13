const express = require('express');
const bookingRouter = express.Router();
const bookingControllers = require('../controllers/bookingController');
const protectRoute = require('../protectRoute');

bookingRouter.post('/bookTickets',  protectRoute);

bookingRouter.post('/bookTickets', bookingControllers.bookTickets);

module.exports = bookingRouter;