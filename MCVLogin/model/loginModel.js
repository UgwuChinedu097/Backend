const { Schema, model } = require('mongoose');
const { type } = require('os');

const loginSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: {type: String, lowercase: true}
});

module.exports = loginModel = model("loginDbNew", loginSchema);
