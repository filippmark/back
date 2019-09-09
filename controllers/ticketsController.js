const Cinema = require("../model/cinema");
const Show = require("../model/show");
const Movie = require("../model/movie");
const Seat = require("../model/seat");
const Hall = require("../model/hall");

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
    if(result.length !== 0)
      respObj.data.push(obj);
  }
  res.status(200).send(respObj);
};


exports.availableSeats = async function(req, res, next) {
  console.log(req.body);
  let {town, cinema, hall} = req.body.data;
  console.log(cinema);
  let cinemaDoc = await Cinema.findOne({name: cinema, town});
  console.log(cinemaDoc);
  if (cinemaDoc){
    let hallDoc = await Hall.findOne({cinemaId: cinemaDoc._id, hallName: hall});
    console.log(hallDoc);
    if (hallDoc){
      const seats = await Seat.model.find({hallId: hallDoc._id});
      if (seats.length > 0){
        let rows = []
        for(let i = 1; i <= hallDoc.amountOfRows; i++){
          let row = seats.filter(element =>   element.row === i );
          console.log(row);
          rows.push(row)
        }
        let data = {
          seats: rows
        }; 
        res.status(200).send(data); 
      }  
    }
  }
}