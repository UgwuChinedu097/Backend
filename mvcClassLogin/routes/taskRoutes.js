const {registerUser, loginUser, createTask, updateTask} = require('../taskController/taskController')
const express = require('express')



const taskRouter = express.Router()


taskRouter.post('/create', registerUser)
taskRouter.post('/login', loginUser)
taskRouter.post("/:id", createTask)
taskRouter.patch('/:userId/task/:taskId', updateTask)

module.exports = taskRouter