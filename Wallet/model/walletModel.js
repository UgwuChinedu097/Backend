const mongoose = require("mongoose");


const walletSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, required: true },
});

module.exports = walletModel = mongoose.model("Wallet", walletSchema);
