const express = require('express')
const db = require('./config/db')
const blogRouter = require('./router/blogRouter')
require('dotenv/config.js')

const {PORT} = process.env

const port = PORT

db() 
const app = express()
app.use(express.json())
app.use('/auth', blogRouter)


app.listen(port, () => {
    console.log(new Date().toLocaleDateString(), port)
})