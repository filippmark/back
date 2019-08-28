const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);


const showSchema = new Schema({
    town:{
        type: String,
        required: true
    },
    movie:{
        type: String,
        required: true
    }, 
    cinema:{
        type: String,
        required: true
    },
    hall:{
        type: String,
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
    time:{
        type: String,
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