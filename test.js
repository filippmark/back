const User = require('./model/user.js');
const Cinema = require('./model/cinema');
const Hall = require("./model/hall");
const Movie = require("./model/movie");
const Show = require("./model/show");

Cinema.find({}, (err, docs) => {console.log(docs)});

Show.find({}, (err, docs) => {console.log(docs)});

Hall.find({}, (err, docs) => {console.log(docs)});

Movie.find({}, (err, docs) => {console.log(docs)});

let arr = Array(5).map((element) => {return {};});


