const express = require('express');
const ticketsRouter = express.Router();
const ticketsController = require("../controllers/ticketsController");

ticketsRouter.post("/filmDates", ticketsController.availableTime);

ticketsRouter.post("/tickets", ticketsController.availableTickets);

ticketsRouter.post("/seats", ticketsController.availableSeats)

module.exports = ticketsRouter;