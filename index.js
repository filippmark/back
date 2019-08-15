const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./user');
const bcrypt = require('bcrypt');
var app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/reg', function(req, res){
    console.log(req.body.email);

    let user;

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(req.body.pass, salt, (err, h) =>{
            
            user = new User({
            email: req.body.email,
            nickName: req.body.userName,
            hash: h,
            });
            user.save((err) =>{
                if(err)
                    return console.log(err);
                else
                    console.log("новый пользователь")
            });
        
            User.find({}, (err, docs) => {
                
                console.log(docs);
        
            });
        });
    });
        
    
    

    res.status(200).send("oke");
});

app.get('/', function(req, res){
    res.send("vce chetka")
})



app.listen(8080);