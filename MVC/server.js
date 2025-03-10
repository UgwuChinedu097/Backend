const express = require('express')
const db = require('./config/db')
const userRouter = require('./routes/userRoutes')
require("dotenv/config")


const {PORT} = process.env


const port = PORT
db()
const app = express()
app.use(express.json())
app.use('/api', userRouter)
// app.use('/', userRouter)

app.listen(port, ()  => {
    console.log(new Date().toLocaleDateString(), port)
})