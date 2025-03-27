import mongoose from "mongoose";

const medicationReminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  medicineName: { type: String, required: true },
  reminderTime: { type: String, required: true },
  // You might store it as a string (e.g. '09:30') or as a Date
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("MedicationReminder", medicationReminderSchema);
