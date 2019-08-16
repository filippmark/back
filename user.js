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
        unique: true,
        validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    nickName:{
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
        const doc = this;
        console.log(doc);
        bcrypt.hash(doc.password, 10, function(err, hash) {
            if(err){
                next(err);
            } else{
                doc.password = hash;
                next();
            }
        });
    }else{
        next();
    }
})



module.exports = mongoose.model("bookingUsers", userScheme);