const Cinema = require("../model/cinema");
const Movie = require("../model/movie");
const Hall = require("../model/hall");
const Show = require("../model/show");
const validator = require("validator");


let findHints = (field, value, docs) => {
    let variants = [];
    let hints = [];
    docs.forEach(element => {
        console.log(element[field]); 
        console.log(variants.indexOf(element[field]));
        if ((element[field].startsWith(value.toLowerCase())) && (hints.indexOf(element[field]) === -1)){
            hints.push(element[field]);
            variants.push(element);
       } 
    });    
    return variants;
}

exports.townSearch = async function(req, res, next){
    console.log(req.body);
    let {value} = req.body;
    try{
        let docs = await Cinema.find({});
        console.log(docs);
        let variants = findHints('town',value, docs);
        console.log(variants);
        res.status(200).send({variants});
    }catch(err){
        next(err);
    }
}

exports.cinemaSearch = async function(req, res, next){
    console.log(req.body);
    let {value} = req.body;
    try{
        let docs = await Cinema.find({});
        let variants = findHints('name',value, docs);
        res.status(200).send({variants});
    }catch(err){
        next(err);
    }
}

exports.filmSearch = async function(req, res, next){
    console.log(req.body);
    let {value} = req.body;
    try{
        let docs = await Movie.find({});
        let variants = findHints('name', value, docs);
        res.status(200).send({variants});
    }catch(err){
        next(err);
    }
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