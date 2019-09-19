const Show = require("../model/show");
const Seat = require("../model/seat");
const Reservation =  require("../model/reservation");
const Order = require("../model/order");

exports.bookTickets = async function(req, res, next) {
    let user = req.user;
    const {showId, tickets, services} = req.body;
    try{
        let showDoc = await Show.findById(showId);
        let reservations = [];
        tickets.forEach( async (seat) => {
            let reservation = new Reservation({
                seat: seat._id,
                start: Date.now(),
            });
            reservations.push(reservation._id);
            await reservation.save();
        })
        showDoc.amount -= reservations.length;
        let orderDoc =  new Order({
            user: user._id,
            reservations,
            services,         
            user: user._id,
            show: showId,
        });
        showDoc.orders = showDoc.orders.concat(orderDoc._id);
        console.log(showDoc);
        console.log(orderDoc);
        await orderDoc.save();
        await showDoc.save();
        res.status(200).send('okei');
    }catch(err){
        next(err);
    }
}