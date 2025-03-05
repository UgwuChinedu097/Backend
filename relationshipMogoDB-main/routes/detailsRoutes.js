const express = require('express')
const {createUserDetails} = require('../controller/detailsController')

const detailsRouter = express.Router()



detailsRouter.post("/details", createUserDetails)


module.exports = detailsRouter