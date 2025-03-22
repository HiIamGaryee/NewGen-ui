import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Post a new health record
router.post("/record", async (req, res) => {
  const { userId, date, exerciseMinutes, waterIntake, weight } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.healthRecords.push({ date, exerciseMinutes, waterIntake, weight });
    await user.save();
    res.json({ message: "Health record added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all health records for a user
router.get("/records/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.healthRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update or Post heartbeat data
router.post("/heartbeat", async (req, res) => {
  const { userId, heartbeat } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    // Assuming `heartbeat` is part of user schema or needs to be pushed to an array
    user.heartbeat = heartbeat; // Assign or push the heartbeat data
    await user.save();
    res.send("Heartbeat updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
