const mongoose = require("mongoose");

const usertoken = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.ObjectId,
    },
    token: {
      type: String,
    },
    isLogin: {
      type: Boolean,
      default: true,
    },
    device: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userToken", usertoken);
