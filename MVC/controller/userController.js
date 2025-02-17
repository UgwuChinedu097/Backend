const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
// getAllUser
const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find()
    return res.status(201).json({ data: allUser })
  } catch (error) {
    return res.status(500).json({ message: "An error occured", error})
  }
}

// getUserById
const getOneUser = async (req, res) => {
    try {
        const {id} = req.params
        const oneUser = await userModel.findById(id)

        if(!oneUser) {
            return res.status(404).json({data: oneUser})
        }

        return res.status(200).json({Message: "User gotten successfully", oneUser})
    } catch (error) {
        return res.status(500).json({Message: "An error occured", error})
    }
}

const postUser = async (req, res) => {
    try {
        const { name, password, email } = req.body
          
        const hashPassword = await bcrypt.hash(password, 10) //for encryption

        const ifUserAlreadyExist = await userModel.findOne({email})
        if(ifUserAlreadyExist){
            return res.status(401).json({message: "user already exits"})
        }

        const createUser = await userModel.create({
            name,
            password: hashPassword,
            email,
        })
        return res.status(200).json({Message: "User created successfully",data: createUser})
    } catch (error) {
        return res.status(400).json({Message: "An error Occured", err:error.message})
    }
}

module.exports = { getAllUser, getOneUser, postUser}