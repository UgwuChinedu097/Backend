const userModel = require("../model/userModel");

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const checkUserIfExist = await userModel.findOne({ email });

    if (checkUserIfExist) {
      return res.status(409).json({ message: "User already exits" });
    }

    const newUser = await userModel.create({
      name,
      email,
    });

    return res
      .status(200)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error || error?.message });
  }
};

const getUser = async (req, res) => {
  try {
    const {userId} = req.params
    const getUser = await userModel.findById(userId).populate("details")

    if(!getUser){
      return res.status(409).json({message: "user not found"})
    }

    return res.status(200).json({data: getUser})
  } catch (error) {
    return res
    .status(500)
    .json({ message: "An error occured", error: error || error?.message });
  }
}


module.exports = { createUser, getUser };
