const userModel = require("../model/userModel");

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await userModel.create({
      name,
      email,
    });

    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(500).json({ message: "an error occured", error });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate("profile");

    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ message: "an error occured", error });
  }
};
