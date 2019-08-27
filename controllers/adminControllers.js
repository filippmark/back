const Cinema = require('../model/cinema');
const Hall = require('../model/hall');
const Movie = require("../model/movie");


exports.newCinema = function(req, res){
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

exports.newHall =  function(req, res){
    console.log(req.body);
    let {townName, cinemaName, hallName} = req.body;
    Cinema.findOne({name: cinemaName, town: townName}, (err, doc) => {
        if(err)
            next(err);
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
    })
};


exports.newFilm = function(req, res){
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