const nodemailer = require("nodemailer");
require("dotenv").config();

// ✅ Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  // Use environment variables
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * ✅ Function to send an email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email content
 */
const sendMail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        console.log(`📧 Email sent successfully to: ${to}`);
    } catch (error) {
        console.error(`❌ Email sending failed:`, error.message);
    }
};

module.exports = sendMail;
