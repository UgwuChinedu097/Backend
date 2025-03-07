const userModel = require('../model/userModel')
const wallletsModel = require('../model/walletModel')


const createWallets = async (req, res) => {
  try {
    const {userId, owner, balance, currency} = req.body
    const getUser = await userModel.findById(userId)
    if(!getUser){
      return res.status(409).json({ message: "You don't have an account, please sign up" })
    }
    
    const newWallets = new wallletsModel({
      owner,
      balance,
      currency,
      user: getUser._id
    })
    
    newWallets.save()
    getUser.wallets = newWallets._id
    await getUser.save()

    return res.status(201).json({message: "User created successfully", data: newWallets })
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}


module.exports = {createWallets}