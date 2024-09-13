const mongoose = require("mongoose");

const otp_schema = new mongoose.Schema(
  {
    mobile: {
      type: Number,
      required: [true, "mobile number required"],
    },
    otp: {
      type: Number,
      required: [true, "otp required"],
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

module.exports = mongoose.model("otps", otp_schema);
