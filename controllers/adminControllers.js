const Cinema = require('../model/cinema');
const Hall = require('../model/hall');
const Movie = require('../model/movie');
const Show = require('../model/show');
const User = require('../model/user');

const validator = require('validator');

exports.newCinema = function(req, res, next){
    console.log(req.body);
    let {townName, cinemaName} = req.body;
    let cinema =  new Cinema({
        name: cinemaName,
        town: townName,
    });
    console.log(cinema);
    cinema.save((err) => {
        if (err)
            next(err);
        res.status(200).send("oke");  
    });
};

exports.newHall =  function(req, res, next){
    console.log(req.body);
    let {townName, cinemaName, hallName} = req.body;
    Cinema.findOne({name: cinemaName, town: townName}, (err, doc) => {
        if(err)
            next(err);
        else{
            if (doc){
                doc.incHalls();
                console.log(doc);
                let hall = new Hall({
                    cinemaId: doc._id,
                    hallName: hallName
                });
                console.log(hall);
                hall.save((err) => {
                    if (err)
                        console.log(err);
                    res.status(200).send("oke");
                })
            }else{
                res.status(200).send('nea');
            }
        }
        
    })
};


exports.newFilm = function(req, res, next){
    console.log(req.body);
    let {name, start, end, description} = req.body;
    let startDate = new Date(start);
    let endDate = new Date(end);
    if ((startDate.toString() !== "Invalid Date") && (endDate.toString() !== "Invalid Date")){
        const movie = new Movie({
            name: name,
            start: startDate,
            end: endDate,
            description: description
        })
        movie.save((err) => {
            if (err)
                next(err);
            res.status(200).send("oke");
        });
    } else{
        res.status(200).send("Проверьте ваши даты");
    }
};


exports.newShow = function(req, res, next){
    console.log(req.body);
    let data = req.body;
    let date = new Date(req.body.date);
    if (date.toString() !== "Invalid date"){
        Cinema.findOne({name: data.cinema, town: data.town},(err, doc) => {
            if (err)
                next(err);
            if (doc){
                let cinemaId = doc._id;
                Hall.findOne({cinemaId: cinemaId, hallName: data.hall}, (err, doc) =>{
                        if(err)
                            next(err);
                        if(doc){
                            let hallId = doc._id;
                            let amount = doc.amountOfSeats;
                            Movie.findOne({name: data.film}, (err, doc) =>{
                                if(err)
                                    next(err);
                                if(doc){
                                    let movieId = doc._id;
                                    if (doc.end.getTime() - date.getTime() >= 0){
                                        let show = new Show({
                                            town: data.town,
                                            movieId: movieId,
                                            cinemaId: cinemaId,
                                            hallId: hallId,
                                            amount: amount,
                                            date: date,
                                            prices: data.prices.slice()
                                        });
                                        show.save((err) => {
                                            if (err)
                                                console.log(err);
                                        });
                                    } else
                                        res.status(200).send("check date")
                                }else{
                                    res.status(200).send("check your film");
                                }
                            });
                        }else
                            res.status(200).send("cheeck your hall");
                });
            } else
                res.status(200).send("cheeck your cinema");         
        });
    }
};

exports.newAdmin = function(req, res, next){
    console.log(req.body);
    let {email} = req.body;
    if (validator.isEmail(email)){
        User.findOneAndUpdate(
            {email: email},
            {$set: {isAdmin: true}},
            {
                returnOriginal: false
            },
            function(err, result){
                if(err)
                    next(err);
                console.log(result);
            }
        );
    } else{
        res.status(200).send("chek email");
    }
}