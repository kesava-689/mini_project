require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const http = require("http");


const volunteerRoutes = require("./routes/volunteerRoutes");
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const basicAdminRoutes = require("./routes/admin");
const extendedAdminRoutes = require("./routes/adminRoutes");
const donationRoutes = require("./routes/donations");
const messageRoutes = require("./routes/messages");
const donationDashboardRoute = require("./routes/donationdashboard");
const donationRequestRoutes = require("./routes/donationRequests");
const notificationRoutes = require('./routes/notificationRoutes');
const impactReportRoute = require("./routes/impactReport");
const userRoutes = require("./routes/userRoutes");
const foodRequestsRoute = require("./routes/foodRequestsRoutes");
const requestRoutes = require("./routes/requestRoutes");
const receiverRequestRoutes = require("./routes/donationRequestRoutes");
const messageRoutes2= require("./routes/userRoutes2");
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donorRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", basicAdminRoutes);
app.use("/api/admin", extendedAdminRoutes);
app.use("/api/donationdashboard", donationDashboardRoute);
app.use("/api/donationrequests", donationRequestRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use('/api/notifications', notificationRoutes);
app.use("/api/impactreport", impactReportRoute);
app.use("/api/user", userRoutes);
app.use("/api", foodRequestsRoute);
app.use("/api/requests", requestRoutes);
app.use("/api/donation-request", receiverRequestRoutes);
app.use("/api/users",messageRoutes2);
app.use('/api/contacts', contactRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // set your frontend URL here in production
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);
  
    socket.on("send_message", (data) => {
      io.emit("receive_message", data); // Broadcast to all
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
