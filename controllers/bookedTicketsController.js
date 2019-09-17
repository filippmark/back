const Show = require("../model/show");
const Seat = require("../model/seat");
const Reservation =  require("../model/reservation");

exports.bookedTickets = async function(req, res, next){
    console.log(req.body);
    const {userId, active} = req.body;
    const reservations = await Reservation.find({user: userId, active}).populate('show seat');
    await Promise.all(reservations.map( async (reservation, index) => {
        let show =  await Show.findById(reservation.show._id).populate("cinema hall movie");
        reservations[index].show = show;
    }))
    res.status(200).send(reservations);          
}