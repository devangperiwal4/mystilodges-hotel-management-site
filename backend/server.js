const express = require('express')

require('dotenv').config()

const port = process.env.PORT || 5000

const dbconfig = require('./config/db')
dbconfig()

const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/rooms', require('./routes/roomRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/bookings', require('./routes/bookingRoutes'))

app.listen(port, () => console.log(`app is listening on port ${port}`))
