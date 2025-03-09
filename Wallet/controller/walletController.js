const userModel = require("../model/userModel");
const walletModel = require("../model/walletModel");


const createWallet = async (req, res) => {
  try {
    const { userId } = req.params; 
    const { balance, currency } = req.body;

    const getUser = await userModel.findById(userId);
    if (!getUser) {
      return res.status(404).json({ message: "User not found, please sign up" });
    }

    if (getUser.wallet) {
      return res.status(400).json({ message: "User already has a wallet" });
    }

    const newWallet = await walletModel.create({
      balance,
      currency,
      owner: getUser._id,
    });

    getUser.wallet = newWallet._id;
    await getUser.save();
    return res.status(201).json({ message: "Wallet created successfully", data: newWallet });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = { createWallet };