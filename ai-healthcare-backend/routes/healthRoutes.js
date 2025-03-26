import express from "express";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route   POST /api/health/record
 * @desc    Create a new health record (exercise, water intake, weight, etc.)
 * @access  Public or Private (adjust if you use sessions)
 */
router.post("/record", async (req, res) => {
  const { userId, date, exerciseMinutes, waterIntake, weight } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.healthRecords.push({ date, exerciseMinutes, waterIntake, weight });
    await user.save();
    res.json({ message: "Health record added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/health/records/:userId
 * @desc    Get all health records for a specific user
 * @access  Public or Private (adjust if you use sessions)
 */
router.get("/records/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ healthRecords: user.healthRecords });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /api/health/heartbeat
 * @desc    Update or add heartbeat data
 * @access  Public or Private (adjust if you use sessions)
 */
router.post("/heartbeat", async (req, res) => {
  const { userId, heartbeat } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Example: if you store a single heartbeat field or push to an array
    user.heartbeat = heartbeat;
    await user.save();
    res.json({ message: "Heartbeat updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /api/health/add-medicine
 * @desc    Add a medicine reminder
 * @access  Public or Private (adjust if you use sessions)
 */
router.post("/add-medicine", async (req, res) => {
  const { userId, medicineName, reminderTime } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.reminders.push({ medicineName, reminderTime });
    await user.save();
    res.json({
      message: "Medicine reminder added successfully",
      reminder: { medicineName, reminderTime },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/health/report/:userId
 * @desc    Generate a simple health report (example: average daily exercise)
 * @access  Public or Private (adjust if you use sessions)
 */
router.get("/report/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Simple example: average exercise time
    const totalRecords = user.healthRecords.length;
    if (totalRecords === 0) {
      return res.json({
        averageDailyExercise: "0 minutes",
        totalDaysLogged: 0,
      });
    }

    const totalExerciseMinutes = user.healthRecords.reduce(
      (sum, record) => sum + record.exerciseMinutes,
      0
    );

    const averageDailyExercise = totalExerciseMinutes / totalRecords;

    res.json({
      averageDailyExercise: `${averageDailyExercise.toFixed(2)} minutes`,
      totalDaysLogged: totalRecords,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
