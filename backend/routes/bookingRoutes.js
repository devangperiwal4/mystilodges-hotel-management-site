const express = require('express')
const {
  bookroom,
  getallbookings,
  getuserbookings
} = require('../controller/bookingController')
const router = express.Router()

const moment = require('moment')
const Booking = require('../model/booking')
const Room = require('../model/room')

router.post('/bookroom', bookroom)
router.get('/getallbookings', getallbookings)
router.get('/getuserbookings', getuserbookings)
router.post('/cancelbooking', async (req, res) => {
  const { bookingid, roomid } = req.body

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid })
    bookingitem.status = 'cancelled'
    await bookingitem.save()
    const room = await Room.findOne({ _id: roomid })
    const bookings = room.currentbookings
    const temp = bookings.filter(
      booking => booking.bookingid.toString() !== bookingid
    )
    console.log(temp)
    room.currentbookings = temp
    await room.save()

    res.send('Booking deleted successfully')
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'something went wrong' })
  }
})

module.exports = router
