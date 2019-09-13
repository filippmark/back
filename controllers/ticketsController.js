const Cinema = require("../model/cinema");
const Show = require("../model/show");
const Movie = require("../model/movie");
const Seat = require("../model/seat");
const Hall = require("../model/hall");
const Reservation = require("../model/reservation");

exports.availableTime = async function(req, res, next) {
  console.log(req.body);
  let movie = req.body.value;
  let info = await Movie.findOne({ name: movie.toLowerCase() });
  console.log(info);
  if (!info) return res.status(500).send("ooops");
  let dates = [];
  dates.push(info.start);
  let previous = new Date(info.start.getTime());
  while (info.end.getTime() - previous.getTime() !== 0) {
    let temp = new Date(previous.getTime());
    temp.setDate(temp.getDate() + 1);
    previous = temp;
    dates.push(previous);
  }
  let data = {
    start: info.start,
    end: info.start,
    dates: dates
  };
  return res.status(200).send(data);
};

exports.availableTickets = async function(req, res, next) {
  console.log(req.body);
  let { movie, date } = req.body;
  let cinemas = await Cinema.find({});
  let respObj = {
    data: []
  };
  for (let i = 0; i < cinemas.length; i++) {
    let obj = {
      cinema: cinemas[i],
      dates: []
    };
    let result = await Show.find({
      town: cinemas[i].town,
      cinema: cinemas[i].name,
      movie: movie.toLowerCase(),
      date: new Date(date)
    });
    obj.dates = result;
    if (result.length !== 0) respObj.data.push(obj);
  }
  res.status(200).send(respObj);
};

function compare(a, b) {
  if (a.num < b.num) {
    return -1;
  }
  if (a.num > b.num) {
    return 1;
  }
  return 0;
}

exports.availableSeats = async function(req, res, next) {
  console.log(req.body);
  let { _id, town, cinema, hall } = req.body.data;
  console.log(cinema);
  let cinemaDoc = await Cinema.findOne({ name: cinema, town });
  if (cinemaDoc) {
    let hallDoc = await Hall.findOne({
      cinemaId: cinemaDoc._id,
      hallName: hall
    });
    if (hallDoc) {
      const seats = await Seat.model.find({ hallId: hallDoc._id });
      const showDoc = await Show.findById(_id);
      console.log(showDoc);
      let reservations = showDoc.reservations;
      if (seats.length > 0) {
        let rows = [];
        for (let i = 1; i <= hallDoc.amountOfRows; i++) {
          let row = seats.filter(element => element.row === i);
          row = row.sort(compare);
          rows.push(row);
        }
        await Promise.all(reservations.map(processReservation(rows)));
        let data = {
          seats: rows
        };
        console.log(data);
        res.status(200).send(data);
      }
    }
  }
};

let processReservation = rows => {
  return async reservation => {
    let res = await Reservation.findById(reservation).populate("seat");
    console.log(res);
    if (res){
      const i = res.seat.row - 1;
      const j = res.seat.num - 1;
      rows[i][j].type = "booked";
    }
  };
};

let removeOldBookedTickets = async () => {
  var cutOffDate = new Date();
  cutOffDate.setMinutes(cutOffDate.getMinutes() - 1);
  const shows = await Show.find({});
  shows.forEach(async show => {
    let updatedReservations = await Promise.all(show.reservations.map(async reservation => {
      let res = await Reservation.findById(reservation);
      if (res){
        console.log(res.start - cutOffDate);
        if (res.start - cutOffDate > 0) {
          return reservation;
        }
      } 
    }));
    updatedReservations = updatedReservations.filter(element => {return element});
    show.reservations = updatedReservations;
    await show.save();
  });
};

setInterval(removeOldBookedTickets, 60000);
