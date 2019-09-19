const Cinema = require("../model/cinema");
const Movie = require("../model/movie");
const Hall = require("../model/hall");
const Show = require("../model/show");
const validator = require("validator");


let findHints = (field, value, docs) => {
    let variants = [];
    let hints = [];
    docs.forEach(element => {
        if ((element[field].startsWith(value.toLowerCase())) && (hints.indexOf(element[field]) === -1)){
            hints.push(element[field]);
            variants.push(element);
       } 
    });    
    return variants;
}

exports.townSearch = async function(req, res, next){
    let {value} = req.body;
    try{
        let docs = await Cinema.find({});
        let variants = findHints('town',value, docs);
        res.status(200).send({variants});
    }catch(err){
        next(err);
    }
}

exports.cinemaSearch = async function(req, res, next){
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
    let {value} = req.body;
    try{
        let docs = await Movie.find({});
        let variants = findHints('name', value, docs);
        res.status(200).send({variants});
    }catch(err){
        next(err);
    }
}

let findAmount = (amount) => {
    return function(element){
        return element.amount >= amount;
    }
}

exports.search = async function(req, res, next) {
    console.log(req.body);
    let data = req.body;
    let amount = 0;
    let result = {
        data: [],
        page: 1,
        totalPages: 1,
        err: ''
    }
    if (data.hasOwnProperty('date')){
        let date = new  Date(data.date);
        if (date.toString() === "Invalid date"){
            result.err = "Проверьте дату";
            return res.status(200).send(result)
        }
    }
    if (data.hasOwnProperty('amount')){
        if (validator.isNumeric(data.amount)){
            amount = parseInt(data.amount, 10);
            delete data.amount;
            if (amount < 1){
                result.err = "Проверьте количество";
                return res.status(200).send(result);
            }
        } else{
            result.err = "Проверьте количество";
            return res.status(200).send(result);
        }
    }
    try{
        if(data.hasOwnProperty('cinema')){
            let cinema = await Cinema.findOne({name: data.cinema.toLowerCase()});
            if (!cinema){
                result.err = "Проверьте кинотеатр";
                return res.status(200).send(result);
            }
            data.cinema = cinema._id;
        }
        
        if(data.hasOwnProperty('film')){
            let movie = await Movie.findOne({name: data.film.toLowerCase()});
            if (!movie){
                result.err = "Проверьте фильм";
                return res.status(200).send(result);
            }
            delete data.film;
            data.movie = movie._id;
            let shows = await Show.find(data);
            if (shows.length > 0){
                result.data.push(movie);
            }
        }else{
            let movies = await Movie.find({});
            await Promise.all(movies.map(async (element) => {
                let details = data;
                details.movie = element._id;
                let shows = await Show.find(details);
                if ((shows.findIndex(findAmount(amount)) !== -1) && (shows.length > 0)){
                    result.data.push(element);
                }
            }))
        }
        return res.status(200).send(result);
    }catch(err){
        next(err);
    }
}