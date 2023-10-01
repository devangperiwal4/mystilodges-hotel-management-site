const express = require('express')
const router = express.Router()
const {
  getallrooms,
  getroombyid,
  addroom
} = require('../controller/roomController')

router.get('/getallrooms', getallrooms)
router.get('/getroombyid', getroombyid)
router.post('/addroom', addroom)

module.exports = router
