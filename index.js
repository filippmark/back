const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var validator = require('validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
require('dotenv').config();
require("./passport");


const User = require('./Model/user');
const Cinema = require('./Model/cinema');
const Hall = require('./Model/hall');
const Movie = require("./Model/movie");


var app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(function(err, reg, res, next){
    console.error(err.stack);
    res.status(500).send("Server failed");
})

app.post('/reg', function(req, res){
    
    let user = new User({
        email: req.body.email,
        password: req.body.pass,
        isAdmin: false
    });

    if ((validator.isEmail(user.email)) && (validator.isAlphanumeric(user.password))){
        user.save((err) =>{
                if (!err)
                    res.status(200).send("oke");
                else
                    res.status(200).send("Email уже занят");
        });
    }else if (!validator.isEmail(user.email)){
        res.status(200).send("Некорректный email")
    } else if (!validator.isAlphanumeric(user.password)){
        res.status(200).send("Некорректный пароль");
    }

});

app.post('/login', function(req, res, next){
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log(user);
        console.log(info);
        if (err) {
             return next(err); 
        }
        if (!user) { 
            return res.status(200).send(info); 
        }
        req.logIn(user, {session: false}, function(err) {
            if (err) { 
                return next(err); 
            }
            const token = jwt.sign({user}, process.env.SECURE_KEY);
            console.log(process.env.SECURE_KEY);
            return res.json({user, token});
        });
      })(req, res, next);
    
    
});

app.post('/newCinema', function(req, res){
    console.log(req.body);
    let {townName, cinemaName} = req.body;
    let cinema =  new Cinema({
        name: cinemaName,
        town: townName,
    });
    cinema.save((err) => {
        if (err)
            next(err);
        res.status(200).send("oke");  
    });
});

app.post("/newHall", function(req, res){
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
});

app.post("/newPlaces", function(req, res){
    console.log(req.body);
    res.status(200).send("oke");
});

app.post("/newFilm", function(req, res){
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
});

app.get('/', function(req, res){
    res.send("vceee chetka");
});

app.listen(8080);