const express = require('express')
const { getAllUser, getOneUser, postUser } = require('../controller/userController')


const userRouter = express.Router()

userRouter.get('/users', getAllUser)
userRouter.get('/:id', getOneUser)
userRouter.post('/post', postUser )

module.exports = userRouter