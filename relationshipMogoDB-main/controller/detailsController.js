const detailModel = require("../model/detailModel");
const userModel = require("../model/userModel")

const createUserDetails = async (req, res) => {
  try {
    const {userId, age, address} = req.body

    const getUser = await userModel.findById(userId)

    if(!getUser){
        return res.status(404).json({message: "You don't have an account, please sign up"})
    }
    const createDetails = new detailModel({
        age,
        address, 
        user: getUser._id,
    })

    createDetails.save()
    getUser.details = createDetails._id
    await getUser.save()

    return res.status(200).json({message: " user details created", data: createDetails})

  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured", error: error || error?.message });
  }
};


module.exports = {createUserDetails}