const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const voterSchema = new Schema({
  mobile: {
    type: Number,
    required: true,
  },
  adhar: {
    type: Number,
    required: true,
  },
  otp: {
    type: String,
  },
  otpExpiration: {
    type: Date,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Voter", voterSchema);
