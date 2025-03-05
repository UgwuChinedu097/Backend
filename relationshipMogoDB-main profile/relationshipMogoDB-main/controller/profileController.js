  const profileModel = require("../model/profileModel");
  const userModel = require("../model/userModel");

  exports.createProfile = async (req, res) => {
    try {
      const { email, age, address, phoneNo } = req.body;

      if (!email) {
        return res.status(404).json({ message: "email is required" });
      }

      const checkUser = await userModel.findOne({ email });
      if (!checkUser) {
        return res.status(404).json({ message: "pls sign up" });
      }

      const profile = await profileModel.create({
        age,
        address,
        phoneNo,
        user: checkUser?._id,
      });
      await userModel.findByIdAndUpdate(
        checkUser._id,
        {
          profile: profile._id,
        },
        { new: true }
      );

      return res.status(201).json({ message: "profile created", data: profile });m
    } catch (error) {
      return res.status(500).json({ message: "an error occured", error });
    }
  };
