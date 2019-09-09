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
    type:{
        type: String,
        required: true,
    },
    row:{
        type: Number,
        required: true,
    },
    num:{
        type: Number,
        required: true
    }
});


exports.model = mongoose.model("seat", seatSchema);
exports.schema = seatSchema;