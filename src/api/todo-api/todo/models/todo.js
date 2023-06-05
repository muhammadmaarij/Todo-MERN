const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedTime: {
    type: Date,
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
});

const todo = mongoose.model("todo", todoSchema);

module.exports = todo;
