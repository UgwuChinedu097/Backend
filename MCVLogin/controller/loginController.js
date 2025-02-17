const loginModel = require("../model/loginModel");
const bcrypt = require('bcrypt')

const getAllLogin = async (req, res) => {
  try {
    const allLogin = await loginModel.find();
    return res.status(201).json({ data: allLogin });
  } catch (error) {
    return res.status(500).json({ message: "An error occured", error });
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10) 
    const login = await loginModel.findOne({ email });
    if (!login) {
      if (email && password) {
        const createUser = await loginModel.create({
          email,
          password: hashPassword,
        });
        return res.status(201).json({Message: "user created successfully",data: createUser})
      }else{
        return res.status(400).json({message: 'all field are required'})
      }
    }else{
        return res.status(409).json({message: "email already exits"})
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getLoginById = async (req, res) => {
    try {
        const {id} = req.params
        const getByID = await loginModel.findById(id)
        if(!getByID){
            return res.status(404).json({data: getByID})
        }
        return res.status(200).json({message: "User gotten successfully", getByID})
    } catch (error) {
        return res.status(500).json({message: "An error occured", error})
    }
}

const updateById = async (req, res) => {
    try {
        const { id } = req.params
        const { password } = req.body
        const hashPassword = await bcrypt.hash(password, 10) 
        const updateid = await loginModel.findByIdAndUpdate(id, {password: hashPassword, }, {new: true})
        if(!updateid){
            return res.status(404).json({Message: "User does not exits"})
        }
       return res.status(200).json({message: "user updated successfully", data: updateid})
    } catch (error) {
     return res.status(500).json({Message: "An error occured"})   
    }
}

const deleteById = async (req, res) => {
    try {
        const {id} = req.params
        const deleteSpecifiUser = await loginModel.findByIdAndDelete(id)
        if (!deleteSpecifiUser) {
            return res.status(404).json({Message: "user not found"})
        }
        return res.status(200).json({message: "User deleted succesfully", data: deleteSpecifiUser})
    } catch (error) {
       return res.status(500).json({message: "An error occured", error}) 
    }
}

module.exports = { getAllLogin, postLogin, getLoginById, updateById, deleteById };
