const mongoose = require("mongoose");

// todo schema
const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completedBy: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedOn: {
      type: Date,
      default: "",
    },
    priority: {
      type: String,
      enum: ["HIGH", "MEDIUM", "LOW"],
      default: "LOW",
    },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("TodoModel", todoSchema, "todos");

module.exports = TodoModel;
