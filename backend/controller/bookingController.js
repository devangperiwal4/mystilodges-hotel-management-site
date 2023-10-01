const asyncHandler = require('express-async-handler')
const moment = require('moment')
const Booking = require('../model/booking')
const Room = require('../model/room')

const bookroom = asyncHandler(async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body
  console.log(fromdate)
  const newbooking = new Booking({
    room: room.name,
    roomid: room._id,
    userid,
    fromdate,
    todate,
    totalamount,
    totaldays,
    transactionid: '1234'
  })
  const booking = await newbooking.save()

  const roomtemp = await Room.findOne({ _id: room._id })

  roomtemp.currentbookings.push({
    bookingid: booking._id,
    fromdate,
    todate,
    userid: userid,
    status: booking.status
  })

  await roomtemp.save()
  res.json(newbooking)
})

const getallbookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({})
  return res.json({ bookings })
})

const getuserbookings = asyncHandler(async (req, res) => {
  const { userid } = req.query
  const bookings = await Booking.find({ userid: userid })
  return res.json({ bookings })
})

module.exports = {
  bookroom,
  getallbookings,
  getuserbookings
}
