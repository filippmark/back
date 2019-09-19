const Cinema = require("../model/cinema");
const Hall = require("../model/hall");
const Movie = require("../model/movie");
const Show = require("../model/show");
const User = require("../model/user");
const Seat = require("../model/seat");

const validator = require("validator");

exports.newCinema = function(req, res, next) {
  console.log(req.body);
  let { townName, cinemaName } = req.body;
  let cinema = new Cinema({
    name: cinemaName.toLowerCase(),
    town: townName.toLowerCase()
  });
  console.log(cinema);
  cinema.save(err => {
    if (err) next(err);
    res.status(200).send("oke");
  });
};

let getAmountOfDeletedPlaces = (rows) => {
  let amount = 0;
  rows.map((row) => {
    row.map((seat) => {
      amount = seat.type === 'delete' ? amount + 1: amount;
    })
  })
  return amount;
}

exports.newHall = async function(req, res, next) {
  console.log(req.body);
  try {
    let { town, cinema, hall, rows } = req.body;
    let doc = await Cinema.findOne({
      name: cinema.toLowerCase(),
      town: town.toLowerCase()
    });
    if (doc) {
      console.log(doc);
      let cinemaId = doc._id;
      let docCheckHall = await Hall.findOne({ cinemaId, hallName: hall });
      if (!docCheckHall) {
        console.log();
  
        let hallDoc = new Hall({
          cinemaId,
          hallName: hall,
          amountOfRows: rows.length,
          amountOfSeats: req.body.amount - getAmountOfDeletedPlaces(rows),
        });
        console.log(hallDoc);
        let saveHall = await hallDoc.save();
        let amount = 0;
        rows.forEach(element => {
          element.forEach(async seat => {
            let seatDoc = new Seat.model({
              hallId: hallDoc._id,
              num: seat.num,
              row: seat.row,
              type: seat.type
            });
            let saveSeat = await seatDoc.save();
          });
        });
      } else {
        res.status(200).send("ooops hall was added by another admin");
      }
    } else {
      res.status(200).send("check your data");
    }
  } catch (err) {
    next(err);
  }
};

exports.newFilm = function(req, res, next) {
  console.log(req.body);
  let {
    name,
    start,
    end,
    overview,
    poster_path,
    backdrop_path,
    vote_average
  } = req.body;
  let startDate = new Date(start);
  let endDate = new Date(end);
  if (
    startDate.toString() !== "Invalid Date" &&
    endDate.toString() !== "Invalid Date"
  ) {
    const movie = new Movie({
      name: name.toLowerCase(),
      title: name,
      start: startDate,
      end: endDate,
      overview,
      poster_path,
      backdrop_path,
      vote_average
    });
    movie.save(err => {
      if (err) return next(err);
      return res.status(200).send("oke");
    });
  } else {
    return res.status(200).send("Проверьте ваши даты");
  }
};

exports.newShow = function(req, res, next) {
  console.log(req.body);
  let data = req.body;
  let date = new Date(req.body.date);
  if (date.toString() !== "Invalid date") {
    Cinema.findOne(
      { name: data.cinema.toLowerCase(), town: data.town.toLowerCase() },
      (err, doc) => {
        if (err) next(err);
        if (doc) {
          let cinemaId = doc._id;
          Hall.findOne(
            { cinemaId: cinemaId, hallName: data.hall.toLowerCase() },
            (err, doc) => {
              if (err) next(err);
              if (doc) {
                console.log(doc);
                let amount = doc.amountOfSeats;
                console.log(amount);
                let hallId = doc._id;
                Movie.findOne({ name: data.film.toLowerCase() }, (err, doc) => {
                  if (err) next(err);
                  if (doc) {
                    if (doc.end.getTime() - date.getTime() >= 0) {
                      let show = new Show({
                        town: data.town.toLowerCase(),
                        movie: doc._id,
                        cinema: cinemaId,
                        hall: hallId,
                        amount,
                        date: date,
                        time: data.time,
                        prices: data.prices,
                        services: data.services,
                        orders: []
                      });
                      show.save(err => {
                        if (err) console.log(err);
                      });
                      res.status(200).send("oke");
                    } else res.status(200).send("check date");
                  } else {
                    res.status(200).send("check your film");
                  }
                });
              } else res.status(200).send("cheeck your hall");
            }
          );
        } else res.status(200).send("cheeck your cinema");
      }
    );
  }
};

exports.newAdmin = function(req, res, next) {
  console.log(req.body);
  let { email } = req.body;
  if (validator.isEmail(email)) {
    User.findOneAndUpdate(
      { email: email },
      { $set: { isAdmin: true } },
      {
        returnOriginal: false
      },
      function(err, result) {
        if (err) next(err);
        console.log(result);
      }
    );
  } else {
    res.status(200).send("chek email");
  }
};
