const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const seatSchema = new Schema({
    hallId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    typeOfSeat:{
        type: String,
        required: true,
    },
});


module.exports = mongoose.model("seat", seatSchema);