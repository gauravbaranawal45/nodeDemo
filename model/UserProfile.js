const mongoose = require("mongoose");

const post_schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "User Id required"],
    },
    userAddress: {
      type: String,
    },
    image: {
      type: String,
    },
    birth: {
      type: String,
    },
    gender: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user_profiles", post_schema);
