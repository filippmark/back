const express = require("express");
const loginRouter = express.Router();
const logIn = require("../controllers/logInControllers").logIn;

loginRouter.post("/login", logIn);


module.exports = loginRouter;