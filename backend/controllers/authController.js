const User = require("../models/User");
const sendMail = require("../config/email");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

// Function to generate a 6-digit OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// ✅ User Signup & Send Welcome Email (Already Implemented)
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required." });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            isApproved: false // User needs admin approval
        });

        await user.save();

        await sendMail(
            email,
            "Registration Received - Awaiting Approval",
            `Hi ${name},\n\nThank you for registering as a ${role}.\n\nYour account is currently under review and will be activated after admin approval.\n\nWe will notify you once it's approved.\n\nRegards,\nFood Wastage Management Team`
        );

        res.status(201).json({ message: "Signup successful! Awaiting admin approval. Check your email." });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};



// ✅ Send OTP for Login

exports.sendOTP = async (req, res) => {
    try {
      const { email, password, role, location, coordinates } = req.body;
  
      // Validate input
      if (!email || !password || !role) {
        return res.status(400).json({
          success: false,
          message: "Email, password, role, location and coordinates are required!",
        });
      }
  
      // Check if the user exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found!" });
      }
  
      if (user.role !== role) {
        return res.status(403).json({
          success: false,
          message: `This user is registered as a ${user.role}, not as a ${role}. Access denied.`,
        });
      }
  
      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid password!" });
      }
  
      // Save location and coordinates
      if (location) {
        user.location = location;
      }
      if (coordinates && coordinates.lat && coordinates.lon) {
        user.coordinates = {
          lat: coordinates.lat,
          lon: coordinates.lon,
        };
      }
  
      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes
  
      await user.save(); // Save OTP, location, and coordinates in DB
  
      // Send OTP via email
      await sendMail(email, "Your OTP Code", `Your OTP is: ${otp}`);
  
      return res.status(200).json({
        success: true,
        message: "OTP has been sent to your email!",
        isApproved: user.isApproved,
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      return res.status(500).json({ success: false, message: "Failed to send OTP." });
    }
  };
  


exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
  
      console.log("Expected OTP:", user.otp);
      console.log("Received OTP:", otp);
      console.log("OTP Expires At:", new Date(user.otpExpires));
      console.log("Current Time:", new Date());
  
      if (!user.otp || user.otp.toString() !== otp.toString()) {
        return res.status(400).json({ message: "Invalid OTP!" });
      }
  
      if (user.otpExpires && user.otpExpires < Date.now()) {
        return res.status(400).json({ message: "OTP has expired!" });
      }
  
      user.otp = null;
      user.otpExpires = null;
      await user.save();
  
      return res.json({
        message: "Login successful!",
        success: true,
        role: user.role,
        name: user.name,
        user_id:user._id
      });
  
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };
  