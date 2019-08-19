const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var validator = require('validator');
const User = require('./user');
var app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(err, reg, res, next){
    console.error(err.stack);
    res.status(500).send("Server failed");
})

app.post('/reg', function(req, res){
    
    let user = new User({
        email: req.body.email,
        password: req.body.pass,
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

app.post('/login', function(req, res){
    const {email, password} = req.body;
    User.findOne({email}, function(err, user){
        if(!user){

        }else{
            user.checkPassword(password, function(err, same){
                if (err){

                } else if (!same){

                }else{

                }
            })
        }
    });
});

app.get('/', function(req, res){
    res.send("vce chetka")
});

app.listen(8080);