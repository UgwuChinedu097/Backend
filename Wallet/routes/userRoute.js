const express = require('express')
const { createNewUser, getUser } = require('../controller/userController')



const userRouter = express.Router()

userRouter.post('/create', createNewUser)
userRouter.get('/:id', getUser)


module.exports = userRouter