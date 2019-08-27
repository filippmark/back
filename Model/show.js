const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);


const showSchema = new Schema({
    movieId:{
        type: Schema.Types.ObjectId,
        required: true
    }, 
    cinemaId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    hallId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    amount:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        required: true   
    },
    active:{
        type: Boolean,
        default: true
    },
    prices:{
        type: Array,
        required: true,
    }
}); 


module.exports = mongoose.model("show", showSchema);