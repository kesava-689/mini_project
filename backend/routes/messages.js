// const express = require("express");
// const router = express.Router();
// const Message = require("../models/Message");

// // GET messages between sender & receiver
// router.get("/:sender/:receiver", async (req, res) => {
//   const { sender, receiver } = req.params;
//   try {
//     const messages = await Message.find({
//       $or: [
//         { sender, receiver },
//         { sender: receiver, receiver: sender },
//       ],
//     }).sort({ timestamp: 1 });

//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to get messages" });
//   }
// });

// // POST a new message
// router.post("/", async (req, res) => {
//   try {
//     const { sender, receiver, content } = req.body;
//     const message = new Message({ sender, receiver, content });
//     const saved = await message.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to send message" });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Get messages between two users
router.get("/:sender/:receiver", async (req, res) => {
  const { sender, receiver } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send a message
router.post("/", async (req, res) => {
  const { sender, receiver, content } = req.body;
  try {
    const newMessage = new Message({ sender, receiver, content });
    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;