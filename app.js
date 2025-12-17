const express = require('express')
const connectDB = require('./config/connection')
const studentRoutes = require('./routes/studentRoutes')
const port = 3000

const app = express()
connectDB()

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', studentRoutes)

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))

