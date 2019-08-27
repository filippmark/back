const Cinema = require("../model/cinema");
const Movie = require("../model/movie");
const Hall = require("../model/hall");
const Show = require("../model/show");
const validator = require("validator");

exports.townSearch = function(req, res, next){
    console.log(req.body);
    let {value} = req.body;
    var variants = [];
    Cinema.find({}, (err, docs) =>{ 
        if (err)
            next(err);
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
        if (err)
            next(err);
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
        if (err)
            next(err);
        console.log(docs);
        variants = docs.filter(element => {
            return element.name.toLowerCase().startsWith(value.toLowerCase());
        });
        res.status(200).send({variants});
    });
}

exports.search = function(req, res, next) {
    console.log(req.body);
    let data = req.body;
    let date = new Date(data.day);
    if (validator.isNumeric(data.amount)){
        let amount = parseInt(data.amount);
        if (date.toString() !== "Invalid date"){
            Cinema.findOne({name: data.cinema}, (err, doc) => {
                if (err){
                    next(err);
                }else{
                    if(!doc){
                        res.status(200).send("No such cinema");
                    }else{
                        let cinemaId = doc._id;
                        Movie.findOne({name: data.film}, (err, doc) => {
                            if (err){
                                next(err);
                            }else{
                                if (!doc){
                                    res.status(200).send("No such film");
                                } else{
                                    Show.findOne({
                                        town: data.town,
                                        cinemaId: cinemaId,
                                        movieId: movieId,
                                        date: date,
                                    }, (err, res) => {
                                        if (err){
                                            next(err);
                                        } else{
                                            if (!doc){
                                                res.status(200).send("no such shows");
                                            } else{
                                                
                                            }
                                        }
                                    });
                                }
                            }
                            
                        })
                    }
                }
            });
        }else{
            res.status(200).send("Check day field");    
        }
    }else{
        res.status(200).send("Check amount field");
    }
}