const mongoose = require("mongoose");
const bcrypt = require('../node_modules/bcrypt/bcrypt');
require('../node_modules/dotenv').config();
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
    isAdmin: {
        type: Boolean,
        required: true
    }
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


userScheme.methods.validPassword = function validPassword(password, cb){
    bcrypt.compare(password, this.password, (err, res) => {
        if(err)
            return cb(err, false);
        return cb(null, res);
    });
} 


module.exports = mongoose.model("cinemaBookingUser", userScheme);