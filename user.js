const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
require('dotenv').config();
const Schema  = mongoose.Schema;


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const userScheme = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
});

userScheme.pre("save", function(next) {
    if (this.isNew) {
        const user = this;
        bcrypt.hash(user.password, 10, function(err, hash) {
            if(err){
                next(err);
            } else{
                user.password = hash;
                next();
            }
        });
    }else{
        next();
    }
})


userScheme.methods.checkPassword = function checkPassword(password, callback){
    bcrypt.compare(password, this.password, function(err, res) {
        if(err){
            callback(err);
        }else{
            callback(err, res);
        }
    });
} 


module.exports = mongoose.model("cinemaBookingUser", userScheme);