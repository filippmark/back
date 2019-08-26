const express = require("express");
const regRouter = express.Router();
const newUser = require("../controllers/regController").newUser;


regRouter.post("/reg", newUser);

module.exports = regRouter;