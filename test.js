const User = require('./Model/user.js');
const Cinema = require('./Model/cinema');
const Hall = require("./Model/hall");
const Movie = require("./Model/movie");

Movie.find({}, function(err, res){
    console.log(res);
});