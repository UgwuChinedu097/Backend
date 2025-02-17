const express = require('express')
const { getAllLogin, postLogin, getLoginById, updateById, deleteById, } = require('../controller/loginController')


const loginRouter = express.Router()

loginRouter.get('/apilogin', getAllLogin)
loginRouter.post('/post', postLogin)
loginRouter.get('/getById/:id', getLoginById)
loginRouter.patch('/update/:id', updateById)
loginRouter.delete('/delete/:id', deleteById)


module.exports = loginRouter