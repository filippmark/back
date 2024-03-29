const express = require("express");
const adminRouter = express.Router();
const adminContollers = require("../controllers/adminControllers");

adminRouter.post("/films", adminContollers.newFilm);

adminRouter.post('/newCinema', adminContollers.newCinema);

adminRouter.post("/newHall", adminContollers.newHall);

adminRouter.post("/newShow", adminContollers.newShow);

adminRouter.post("/newAdmin", adminContollers.newAdmin);

module.exports = adminRouter;