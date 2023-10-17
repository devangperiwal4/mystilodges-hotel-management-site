const express = require('express')
const {
  registerUser,
  loginUser,
  getallusers
} = require('../controller/userController')
const router = express.Router()

const User = require('../model/user')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getallusers', getallusers)
router.post('/deleteuser', async (req, res) => {
  const userid = req.body.userid

  try {
    await User.findOneAndDelete({ _id: userid })
    res.send('User Deleted Successfully')
  } catch (error) {
    return res.status(400).json({ message: error })
  }
})

module.exports = router
