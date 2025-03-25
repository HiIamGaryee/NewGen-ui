import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, username, gender, age } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      username,
      gender,
      age,
    });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    req.session.user = user.id; // Set user session
    res.send("Logged in successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/profile", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).send("Not authenticated");
    }
    const user = await User.findById(req.session.user).select("-password"); // Exclude the password from the result
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to log out.");
    }

    res.send("Logged out successfully");
  });
});

export default router;
