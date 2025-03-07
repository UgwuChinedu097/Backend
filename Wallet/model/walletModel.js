const mongoose = require("mongoose");

const walletsSchema = new mongoose.Schema({
  owner: String,
  balance: Number,
  currency: String,
  user: {
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports= wallletsModel  = mongoose.model("wallets", walletsSchema);
