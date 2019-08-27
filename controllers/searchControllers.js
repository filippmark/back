const Cinema = require("../model/cinema");
const Movie = require("../model/movie");

exports.townSearch = function(req, res){
    console.log(req.body);
    let {value} = req.body;
    var variants = [];
    Cinema.find({}, (err, docs) =>{ 
        console.log(docs);
        variants = docs.filter(element => {
            return element.town.toLowerCase().startsWith(value.toLowerCase());
        });
        
        res.status(200).send({variants});
    })
}

exports.cinemaSearch = function(req, res){
    console.log(req.body);
    let {value} = req.body;
    var variants = [];
    Cinema.find({}, (err, docs) =>{ 
        console.log(docs);
        variants = docs.filter(element => {
            return element.name.toLowerCase().startsWith(value.toLowerCase());
        });
        res.status(200).send({variants});
    })
}

exports.filmSearch = function(req, res){
    console.log(req.body);
    let {value} = req.body;
    var variants = [];
    Movie.find({}, (err, docs) => {
        console.log(docs);
        variants = docs.filter(element => {
            return element.name.toLowerCase().startsWith(value.toLowerCase());
        });
        res.status(200).send({variants});
    });
}