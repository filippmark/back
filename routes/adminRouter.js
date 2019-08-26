const express = require("express");
const adminRouter = express.Router();
const adminContollers = require("../controllers/adminControllers");

adminRouter.post("/newFilm", adminContollers.newFilm);

adminRouter.post('/newCinema', adminContollers.newCinema);

adminRouter.post("/newHall", adminContollers.newHall);

module.exports = adminRouter;