const express = require('express')
const db = require('./config/db')
const loginRouter = require('./routes/loginRoutes')

require('dotenv/config.js')

const { PORT } = process.env

const port = PORT
db()
const app = express()
app.use(express.json())
app.use('/login', loginRouter)


app.listen(port, () => {
    console.log(new Date().toLocaleDateString(), port)
})