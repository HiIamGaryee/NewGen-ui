import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  gameScores: [
    {
      date: { type: Date, default: Date.now },
      score: { type: Number, default: 0 },
    },
  ],
  heartbeat: { type: Number, required: false }, // Optional field for heartbeat data
});

export default mongoose.model("User", userSchema);
