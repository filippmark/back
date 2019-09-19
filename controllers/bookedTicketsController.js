const Show = require("../model/show");
const Order = require("../model/order");
const Reservation = require("../model/reservation");

exports.bookedTickets = async function(req, res, next) {
  console.log(req.body);
  const { userId, active } = req.body;
  const orders = await Order.find({ user: userId, active }).populate(
    "reservations"
  );
  await Promise.all(orders.map(async (order, i) => {
    let showDoc = await Show.findById(order.show).populate("cinema hall movie");
    orders[i].show = showDoc; 
    await Promise.all( order.reservations.map(async (reservation, j) => {
        const reservationDoc = await Reservation.findById(reservation).populate("seat");
        orders[i].reservations[j] = reservationDoc;
    }));
  }));
  console.log(orders);
  res.status(200).send(orders);
};