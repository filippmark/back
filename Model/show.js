const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

const showSchema = new Schema({
  town: {
    type: String,
    required: true
  },
  movie: {
    type: Schema.ObjectId,
    ref: "movie"
  },
  cinema: {
    type: Schema.ObjectId,
    ref: "cinema"
  },
  hall: {
    type: Schema.ObjectId,
    ref: "hall"
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  prices: {
    type: Array,
    required: true
  },
  reservations: {
    type: [{ type: Schema.ObjectId, ref: "reservation" }]
  }
});

module.exports = mongoose.model("show", showSchema);
