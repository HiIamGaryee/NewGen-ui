import express from "express";
import MedicationReminder from "../models/MedicationReminder.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route  POST /api/medicine
 * @desc   Add a new medication reminder for the logged-in user
 * @access Private (requires session)
 */
router.post("/", async (req, res) => {
  const userId = req.session.user;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized - not logged in" });
  }

  const { medicineName, reminderTime } = req.body;
  if (!medicineName || !reminderTime) {
    return res
      .status(400)
      .json({ message: "medicineName and reminderTime are required" });
  }

  try {
    // Validate the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newReminder = new MedicationReminder({
      userId: user._id,
      medicineName,
      reminderTime,
    });
    await newReminder.save();

    res.json({ message: "Reminder added successfully", reminder: newReminder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route  GET /api/medicine
 * @desc   Get all medication reminders for the logged-in user
 * @access Private (requires session)
 */
router.get("/", async (req, res) => {
  const userId = req.session.user;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized - not logged in" });
  }

  try {
    // Optionally check user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all reminders belonging to this user
    const reminders = await MedicationReminder.find({ userId }).sort({
      createdAt: -1,
    });
    res.json({ reminders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
