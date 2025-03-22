import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import dietRoutes from "./routes/dietRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
// Middleware
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Route Handlers
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/diet", dietRoutes);
app.use("/api/health", healthRoutes);

// Specify the port to listen on
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
