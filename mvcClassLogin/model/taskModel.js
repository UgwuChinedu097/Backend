const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  UserName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  task: [
    {
      title: { type: String, required: true },
      description: { type: String },
      completed: { type: Boolean, default: false },
    },
  ],
});

module.exports = taskModel = model("taskModelDb", taskSchema);
