const Request = require("../models/Request");

exports.requestDonation = async (req, res) => {
    const { donorName, receiverName, foodTitle } = req.body;
    console.log("Incoming Request:", donorName, receiverName, foodTitle); // <--- Add this
  
    try {
      const existingRequest = await Request.findOne({ donorName, receiverName, foodTitle });
      if (existingRequest) {
        return res.status(400).json({ message: "You already requested this food item." });
      }
  
      const newRequest = new Request({ donorName, receiverName, foodTitle });
      await newRequest.save();
      res.status(201).json({ message: "Request sent for approval!" });
    } catch (error) {
      console.error("Error in requestDonation:", error); // <--- Add this
      res.status(500).json({ message: "Error while submitting request", error });
    }
  };
  

exports.getRequestsByReceiver = async (req, res) => {
  const { receiverName } = req.params;

  try {
    const requests = await Request.find({ receiverName });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error });
  }
};


