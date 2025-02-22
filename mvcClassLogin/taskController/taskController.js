const taskModel = require("../model/taskModel");
const bcrypt = require('bcrypt')

const handleError = (res, error) => {
  return res.status(500).json({ Message: "An error occured", error:error || error.message });
};


const registerUser = async (req, res) => {
    try {
        const {userName, email, password} = req.body
        if (!password || !email) {
            return res.status(400).json({message: "all field is required" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const createUser = await taskModel.create({
            userName,
            email,
            password: hashPassword,
            task:[]
        })
        return res.status(200).json({success: true, data: createUser })
    } catch (error) {
        handleError(res, error)
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const findUser = await taskModel.findOne({email})
        if(!findUser){
            return res.status(400).json({message: "user does not exits"})
        }
        const checkpas = await bcrypt.compare(password, findUser?. password)
        if(!checkpas) {
            return res.status(404).json({message: "invalid email or password"})
        }
        return res.status(201).json({success: true, findUser})
    } catch (error) {
        handleError(res, error)
    }
}


const createTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const { id } = req.params;
        // Find the task document by ID
        const taskDoc = await taskModel.findById(id);
        if (!taskDoc) {
            return res.status(404).json({ message: "Task document not found" });
        }
        // Add the new task
        const newTask = { title, description, completed };
        taskDoc.task.push(newTask);
        // Save the updated document
        await taskDoc.save();
        return res.status(200).json({ message: "Task added", data: newTask });
    } catch (error) {
        handleError(res, error);
    }
};

const updateTask = async  (req, res) => {
    try {
        const {title, description, completed} = req.body
        const {userId , taskId} = req.params
        const findUser = await taskModel.findById(userId)
        // check for user with the id
        if(!findUser){
            return res.status(404).json({message:"user not found"})
        }
        // check for userId through taskId 
        const findByTask = findUser.task.id(taskId)
        if(!findByTask){
            return res.status(404).json({message: 'task does not exits'})
        }

        // then update task
        if (title) findByTask.title = title
        if(description) findByTask.description = description
        if(typeof completed === "boolean") findByTask.completed = completed
        await findUser.save()
        return res.status(200).json({message: "task updated successfully", data: findByTask})
    } catch (error) {
        handleError(res, error);
    }
}


module.exports = {registerUser, loginUser, createTask, updateTask}