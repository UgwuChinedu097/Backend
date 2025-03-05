const {Router} = require('express')
const { createUser, getUser } = require('../controller/userController')


const userRouter = Router()


userRouter.post('/', createUser)
userRouter.get('/:userId', getUser)


module.exports = userRouter