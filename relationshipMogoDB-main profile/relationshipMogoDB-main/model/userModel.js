const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
});

module.exports = mongoose.model("user", userSchema);
