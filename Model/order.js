const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("../node_modules/dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'cinemaBookingUser',
        required: true
    },
    reservations:{
        type: [{ type: Schema.ObjectId, ref: "reservation" }],
        required: true
    },
    services:{
        type: Array,
        required: true
    },
    show:{
        type: Schema.Types.ObjectId,
        ref: 'show'
    },
    active:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('order', orderSchema);