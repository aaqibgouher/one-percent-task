const mongoose = require("mongoose");

// user token schema
const tokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// model
const TokenModel = mongoose.model("TokenModel", tokenSchema, "tokens");

// exporting model
module.exports = TokenModel;
