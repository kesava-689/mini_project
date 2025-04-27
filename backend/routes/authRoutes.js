const express = require("express");
const { signup, sendOTP, verifyOTP } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);  // Already Implemented
router.post("/send-otp", sendOTP);  // Send OTP for Login
router.post("/verify-otp", verifyOTP);  // Verify OTP & Login

module.exports = router;
