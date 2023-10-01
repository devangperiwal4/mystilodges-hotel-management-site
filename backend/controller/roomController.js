const Room = require('../model/room')

// @desc    Get room data
// @route   GET /api/rooms/getallrooms
// @access  Private
const getallrooms = async (req, res) => {
  try {
    const rooms = await Room.find({})
    return res.json({ rooms })
  } catch (error) {
    throw new Error(error)
  }
}

// @desc    Get room data
// @route   POST /api/rooms/getroombyid
// @access  Private
const getroombyid = async (req, res) => {
  try {
    const id = req.query.roomid
    // console.log(req)
    const room = await Room.findOne({ _id: id })
    return res.json(room)
  } catch (error) {
    throw new Error(error)
  }
}

const addroom = async (req, res) => {
  const {
    room,
    rentperday,
    maxcount,
    description,
    phonenumber,
    type,
    image1,
    image2,
    image3
  } = req.body

  const newroom = new Room({
    name: room,
    rentperday,
    maxcount,
    description,
    phonenumber,
    type,
    imageurls: [image1, image2, image3]
  })
  await newroom.save()
}
module.exports = {
  getallrooms,
  getroombyid,
  addroom
}
