const express = require("express");
const searchRouter = express.Router();
const searchControllers = require("../controllers/searchControllers");

searchRouter.post("/search/town", searchControllers.townSearch);

searchRouter.post("/search/cinema" , searchControllers.cinemaSearch);

searchRouter.post("/search/film", searchControllers.filmSearch);

module.exports = searchRouter;