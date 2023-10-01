const express = require('express')
const {
  bookroom,
  getallbookings,
  getuserbookings
} = require('../controller/bookingController')
const router = express.Router()

router.post('/bookroom', bookroom)
router.get('/getallbookings', getallbookings)
router.get('/getuserbookings', getuserbookings)
module.exports = router
