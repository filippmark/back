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


    /*const User = new User({
        email: req.body.email,
        nickName: req.body.userName,
        hash: ,
        salt:
    });
    User.save((err) =>{
        if(err)
            return console.log(err);
        else
            console.log("новый пользователь")
    });
    */

    res.status(200).send("oke");
});

app.get('/', function(req, res){
    res.send("vce chetka")
})



app.listen(8080);