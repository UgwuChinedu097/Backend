const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
app.use(express.json())
require("dotenv").config();


const Port = process.env.Port || 2039

mongoose.connect("mongodb://localhost:27017/bookslb")
  .then(() => {
    console.log("connected")
  }).catch ((error) => {
    console.log('An error occured', error)
  })

const bookSchema = new mongoose.Schema({
    title: String,
    yearPublished: Number,
    author: String,
    genre: String,
    available: Boolean,
})

const bookModel = mongoose.model('book', bookSchema)

app.get('/', async (req, res) => {
    try{
        const getBooks = await bookModel.find()
        res.status(200).json({Message: "all books", books: getBooks})
    }catch(err){
        res.status(500).json({Message: "an error occured", err})
    }
})


app.listen(Port, () => {
    console.log(`Server Running on ${Port}`)
})