const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
require('../node_modules/dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const movieSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    start:{
        type: Date,
        required: true   
    },
    end:{
        type: Date,
        required: true   
    },
    description:{
        type: String,
        required: true
    }
});


module.exports = mongoose.model("movie", movieSchema);