const User = require('./model/user.js');
const Cinema = require('./model/cinema');
const Hall = require("./model/hall");
const Movie = require("./model/movie");
const Show = require("./model/show");

Show.findOne({town: "Могилёв"}, function(err, res){
    console.log(res);
});