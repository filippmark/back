const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("../node_modules/dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

const reservationSchema = new Schema({
    start:{
        type: Date,
        required: true
    },
    seat:{
        type: Schema.Types.ObjectId,
        ref: 'seat'
    }
});

module.exports = mongoose.model('reservation', reservationSchema);