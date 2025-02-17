const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(exprsssjson())
const port = 5000

mongoose.connect('mondodb://localhost:27017/userlb')
  .then(() => {
    console.log('Connected')
  }).catch((err) => {
    console.log('An error occured', err)
  })
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
})


const userModel = mongoose('user', userSchema)

app.get('/', async (req, res) => {
    try{
        const getUSer = await userModel.find()
        res.status(200).json({Message: "all user", user: getUSer})
    }catch(err){
        res.status(500).json({Message: "an error occured", err})
    }
})

app.post('/', async (req, res) => {
 try {
    const {name, email, password, age} = req.body
    const postUser = new userModel ({
        name,
        email, 
        password,
        age,
    })
    res.status(200).json({Message: "gotten Successfully", user: postUser})
 } catch (error) {
    res.status(500).json({Message: "an error occured", error})
 }
})

app.get("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const getOneUser = await userModel.findById(id)
        if(!getOneUser){
            res.status(404).json({Message: "not Found", })
        }
        res.status(200).json({Message: "use gotten successfully", user:getOneUser })
    } catch (error) {
        res.status(500).json({Message: "user not found", error})
    }
})

app.patch('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {name, email, age, password} = req.body
        const updateOneUser = await userModel.findByIdAndUpdate(id, {name, email, age, password}, {new: true})
        if (!updateOneUser){
            res.status(404).json({Messaeg: "user not updated"})
        }res.status(200).json({Message: "user updated Successfully", user: updateOneUser})
    } catch (error) {
        res.status(500).json({Message: "an error occured", error})
    }
})

app.listen(port, () => {
    console.log(`server ruuunig on ${port}`)
}) 