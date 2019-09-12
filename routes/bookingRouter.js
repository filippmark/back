const express = require('express');
const bookingRouter = express.Router();
const bookingControllers = require('../controllers/bookingController');

bookingRouter.post('/bookTickets', bookingControllers.bookTickets);

module.exports = bookingRouter;