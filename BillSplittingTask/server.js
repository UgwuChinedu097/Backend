const express = require('express')
const db = require('./config/db')
const billRouter = require('./router/billRouter')
require('dotenv/config.js')


const {PORT} = process.env

const port = PORT
db()
const app = express()
app.use(express.json())
app.use('/auth', billRouter)


app.listen(port, () => {
    console.log(`server is running on ${port}`)
})