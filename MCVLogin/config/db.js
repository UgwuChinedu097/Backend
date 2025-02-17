const mongoose = require('mongoose')
require('dotenv/config.js')

const { MONGODB_URL } = process.env

const dbConfig = async () => {
    try{
        await mongoose.connect(MONGODB_URL ?.toString())
        console.log('connected to db')
    } catch (error) {
        console.log("An error occured", error)
    }
}

module.exports = dbConfig