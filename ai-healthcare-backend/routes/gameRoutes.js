import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/score", async (req, res) => {
  const { score } = req.body;
  const userId = req.session.user;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.gameScores.push({ date: new Date(), score });
    await user.save();
    res.json({ message: "Score added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all game scores for a user
router.get("/scores/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.gameScores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
