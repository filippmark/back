const express = require("express");
const bookedTicketsRouter = express.Router();
const bookedTicketsController = require('../controllers/bookedTicketsController');

bookedTicketsRouter.post('/bookedTickets', bookedTicketsController.bookedTickets);

module.exports = bookedTicketsRouter;