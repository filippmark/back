const Show = require("../model/show");
const Seat = require("../model/seat");
const Reservation =  require("../model/reservation");

exports.bookedTickets = async function(req, res, next){
    console.log(req.body);
    const {userId, active} = req.body;
    const reservations = await Reservation.find({user: userId, active}).populate('show seat');
    console.log(reservations);
    res.status(200).send(reservations);          
}