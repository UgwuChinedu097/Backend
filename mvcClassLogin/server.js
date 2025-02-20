const express = require('express')
const db = require('./config/db')
const taskRouter = require('./routes/taskRoutes')
require('dotenv/config')

const {PORT} = process.env

const port = PORT
db()
const app = express()
app.use(express.json())
app.use('/auth', taskRouter)

app.listen(port, () => {
    console.log(`server is running on ${port}`)
}) 
