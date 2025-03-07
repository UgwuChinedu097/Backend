const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: { type: String, unique: true, required: true },
  password: {type: String, required: true},
  wallets: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "wallets",
    unique: true,
  },
});

module.exports = userModel = mongoose.model("user", userSchema);
