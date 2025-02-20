const mongoose = require('mongoose')
require('dotenv/config')

const {MONGODB_URL} = process.env

const db = async () => {
   try {
    await mongoose.connect(MONGODB_URL?.toString())
    console.log("connected to db")
   } catch (error) {
     console.log("an error occured", error)
   }

}   

module.exports = db