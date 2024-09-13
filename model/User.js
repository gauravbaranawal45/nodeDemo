const mongoose = require("mongoose");

const users_schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name required"],
    },
    mobile: {
      type: Number,
      required: [true, "mobile number required"],
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    accountDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", users_schema);
