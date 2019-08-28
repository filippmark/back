const express = require('express');
const ticketsRouter = express.Router();
const ticketsController = require("../controllers/ticketsController");

ticketsRouter.post("/tickets", ticketsController.availableTickets);

module.exports = ticketsRouter;