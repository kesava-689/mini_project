const nodemailer = require("nodemailer");

// Create a transporter using your email service (Gmail, Outlook, etc.)
const transporter = nodemailer.createTransport({
    service: "gmail", // Change to your email provider (e.g., Outlook, Yahoo)
    auth: {
        user: process.env.EMAIL_USER, // Sender email address
        pass: process.env.EMAIL_PASS, // App password (not your email password)
    },
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender email
            to, // Recipient email
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 Email sent successfully to:", to);
    } catch (error) {
        console.error("❌ Email sending failed:", error.message);
    }
};

module.exports = sendEmail;
