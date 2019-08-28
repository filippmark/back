const Cinema = require("../model/cinema");
const Show = require("../model/show");

exports.availableTickets = async function(req, res, next){
    console.log(req.body);
    let movie = req.body.value;
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
        let result = await Show.find({town: cinemas[i].town ,cinema: cinemas[i].name, movie: movie.toLowerCase()});
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