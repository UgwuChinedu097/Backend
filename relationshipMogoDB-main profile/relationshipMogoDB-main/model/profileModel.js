const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  age: Number,
  address: String,
  phoneNo: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("profile", profileSchema);
