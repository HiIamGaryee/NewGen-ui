import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Post a diet entry
router.post("/entry", async (req, res) => {
  const { userId, mealType, food } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.dietEntries.push({ date: new Date(), mealType, food });
    await user.save();
    res.json({ message: "Diet entry added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all diet entries for a user
router.get("/entries/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.dietEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
