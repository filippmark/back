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
            return element.town.startsWith(value.toLowerCase());
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
            return element.name.startsWith(value.toLowerCase());
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
            return element.name.startsWith(value.toLowerCase());
        });
        res.status(200).send({variants});
    });
}

exports.search = function(req, res, next) {
    console.log(req.body);
    let data = req.body;
    if (data.hasOwnProperty('date')){
        let date = new  Date(data.date);
        if (date.toString() === "Invalid date"){
            return res.status(200).send("Проверьте дату")
        }
    }
    if (data.hasOwnProperty('amount')){
        if (validator.isNumeric(data.amount)){
            let amount = parseInt(data.amount, 10);
            data.amount = amount;
            if (amount <= 1){
                return res.status(200).send("Проверьте количество");
            }
        } else{
            return res.status(200).send("Проверьте количество");
        }
    }
    Show.find(data, (err, docs) => {
        if (err){
            next(err);
        } else{
            if(docs.length === 0 ){
                return res.status(200).send("Нет подходящих результатов");
            }else{
                res.status(200).send(docs);
            }
        }
            
    });
}