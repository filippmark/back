const Cinema = require("../model/cinema");
const Show = require("../model/show");
const Movie = require("../model/movie");

exports.availableTime = async function(req, res, next){
    console.log(req.body);
    let movie = req.body.value;
    let info = await Movie.findOne({name: movie.toLowerCase()});
    console.log(info);
    if(!info)
        return res.status(500).send("ooops");
    let dates = [];
    dates.push(info.start);
    let previous = new Date(info.start.getTime());
    while((info.end.getTime() - previous.getTime()) !== 0){
        let temp = new Date(previous.getTime());
        temp.setDate(temp.getDate() + 1);
        previous = temp;
        dates.push(previous);
    }
    let data = {
        start: info.start,
        end: info.start,
        dates: dates
    }
    return res.status(200).send(data);
}

exports.availableTickets = async function(req, res, next){
    console.log(req.body);
    let {movie, date} = req.body;
    let cinemas = await Cinema.find({});
    console.log(cinemas);
    let respObj = {
        data: []
    };
    for(let i = 0; i < cinemas.length; i++){
        let obj = {
            cinema: cinemas[i],
            dates: []
        };
        console.log(movie);
        let result = await Show.find({town: cinemas[i].town, cinema: cinemas[i].name, movie: movie.toLowerCase()});
        let dates = result.map((element) => {
            return {
                time: element.time,
                date: element.date,
                amount: element.amount
            }
        })
        obj.dates = dates;
        respObj.data.push(obj);
    }
    res.status(200).send(respObj);
}