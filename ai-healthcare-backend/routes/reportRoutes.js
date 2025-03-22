import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Generate a health report for a user
router.get("/health/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Simple calculation for average exercises, etc.
    const avgExercise =
      user.healthRecords.reduce(
        (acc, record) => acc + record.exerciseMinutes,
        0
      ) / user.healthRecords.length;
    const report = {
      averageDailyExercise: avgExercise.toFixed(2) + " minutes",
      totalDaysLogged: user.healthRecords.length,
    };
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
