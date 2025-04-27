const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipientName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["donor", "volunteer"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
