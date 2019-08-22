const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);


const showSchema = new Schema({
    film:{
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
    start:{
        type: Date,
        required: true
    },      
    end:{                       
        type: Date,     
        required: true  
    }   
}); 





module.exports = mongoose.model("show", showSchema);