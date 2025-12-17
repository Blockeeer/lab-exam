const express = require('express')
const connectDB = require('./db/connection')
const studentRoutes = require('./routes/studentRoutes')


const app = express()
connectDB()


app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


app.use('/', studentRoutes)


app.listen(3000, () => {
console.log('Server running at http://localhost:3000')
})