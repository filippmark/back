const mongoose = require("mongoose");
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
        unique: true
    },
    hash:{
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("bookingUsers", userScheme);