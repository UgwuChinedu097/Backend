const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const createNewUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const find = await userModel.findOne({ email });
    if (find) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await userModel.create({
      name,
      password: hashPassword,
      email,
    });

    return res.status(201).json({ message: "User created successfully", data: newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getAllUser = await userModel.findById(id).populate({ path: "wallet", select: "balance currency" });

    if (!getAllUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ data: getAllUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createNewUser, getUser };
