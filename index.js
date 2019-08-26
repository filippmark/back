const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
require("./passport");


const adminRouter = require('./routes/adminRouter');
const regRouter = require('./routes/regRouter');
const loginRouter = require('./routes/loginRouter');


var app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(function(err, reg, res, next){
    console.error(err.stack);
    res.status(500).send("Server failed");
})


app.use("/", regRouter);

app.use('/', loginRouter);

app.use('/', adminRouter);

app.get('/', function(req, res){
    res.send("vceewwe chetka");
});

app.listen(8080);