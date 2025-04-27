const Notification = require("../models/Notification");

const sendNotification = async (recipientName, message, role) => {
  try {
    const notification = new Notification({
      recipientName,
      message,
      role,
    });
    await notification.save();
  } catch (error) {
    console.error(`Error sending notification to ${recipientName}:`, error);
    throw error;
  }
};

module.exports = sendNotification;
