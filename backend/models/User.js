const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  role: {
    type: String,
    enum: ["donor", "receiver", "volunteer", "partnership", "admin"],
    required: [true, "Role is required"]
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String,
    default: null
  },
  location: {
    type: String
  },
  coordinates: {
    lat: {
      type: Number,  // Change String to Number for lat
      default: null
    },
    lon: {
      type: Number,  // Change String to Number for lon
      default: null
    }
  },
  otpExpires: {
    type: Date,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
