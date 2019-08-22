const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);


const cinemaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    town:{
        type: String,
        required: true,
    },
    amountOfHalls:{
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('cinema',cinemaSchema);