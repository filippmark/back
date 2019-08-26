const validator = require("validator");
const User = require("../model/user");


exports.newUser = function(req, res){
    
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

};