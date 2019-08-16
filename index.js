const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./user');
var app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/reg', function(req, res){
    console.log(req.body.email);
        
    let user = new User({
        email: req.body.email,
        nickName: req.body.userName,
        password: req.body.pass,
    });

    user.save((err) =>{
        if(err)
            return console.log(err);
        else{
            res.status(200).send("oke");
        }
    });
        
});

app.get('/', function(req, res){
    res.send("vce chetka")
})



app.listen(8080);