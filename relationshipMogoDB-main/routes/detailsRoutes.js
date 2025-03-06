const express = require('express')
const {createUserDetails, updateDetails} = require('../controller/detailsController')

const detailsRouter = express.Router()



detailsRouter.post("/details", createUserDetails)
detailsRouter.patch('/:id', updateDetails)


module.exports = detailsRouter