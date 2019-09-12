const Show = require("../model/show");
const Seat = require("../model/seat");
const Reservation =  require("../model/reservation");
const passport = require("passport"); 


exports.bookTickets = async function(req, res, next) {
    console.log(req.body);
    const {showId, tickets} = req.body;
    try{
        let showDoc = await Show.findById(showId);
        let reservations = [];
        tickets.forEach( async (seat) => {
            let reservation = new Reservation({
                seat: seat._id,
                start: Date.now(),
            });
            console.log(reservation);
            reservations.push(reservation._id);
            let saved = await reservation.save();
        })
        console.log(reservations);
        showDoc.reservations = showDoc.reservations.concat(reservations.slice());
        let saved = await showDoc.save();
        console.log(saved);
        res.status(200).send('okei');
    }catch(err){
        next(err);
    }
}
