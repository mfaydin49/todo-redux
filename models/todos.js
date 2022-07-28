const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  id: {
    type: String,
  },

  title: { type: String, required: true },

  date: {
    type: Date,
    default: Date.now,
  },

  completed: {
    type: Boolean,
  },
});

module.exports = Todo = mongoose.model("todo", TodoSchema);
