const User = require('./model/user.js');
const Cinema = require('./model/cinema');
const Hall = require("./model/hall");
const Movie = require("./model/movie");

Cinema.find({}, function(err, res){
    console.log(res);
});