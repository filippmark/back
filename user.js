const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema  = mongoose.Schema;


const uri = "mongodb+srv://fil:123@cluster0-hhu4a.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const userScheme = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    nickName:{
        type: String,
        required: true,
        unique: true,
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


module.exports = mongoose.model("bookingUsers", userScheme);