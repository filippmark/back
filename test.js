const User = require('./model/user.js');
const Cinema = require('./model/cinema');
const Hall = require("./model/hall");
const Movie = require("./model/movie");
const Show = require("./model/show");
const Reservation = require("./model/reservation");
const Order = require("./model/order");


Order.find({}, (err, docs) => {console.log(docs)})

//Show.find({}, (err, docs) => {console.log(docs)});

//Reservation.find({}, (err, docs) => {console.log(docs)});
