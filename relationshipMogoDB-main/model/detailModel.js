const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
  age: Number,
  address: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("details", detailsSchema);
