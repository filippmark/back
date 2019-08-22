const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const hallSchema = new Schema({
    cinemaId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    hallName:{
        type: String,
        required: true
    },
    amountOfSeats:{
        type: Number,
        required: true
    }
});



module.exports = mongoose.model("hall", hallSchema);