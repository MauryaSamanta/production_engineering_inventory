import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import assetRoutes from "./routes/assetRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import changeRoutes from "./routes/changeRequestRoutes.js";
import labRoute from "./routes/labsRoute.js";

dotenv.config();

const app = express();

/* ----------------------- Middleware ----------------------- */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ----------------------- Routes ----------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/users", userRoutes);
app.use("/api/changes", changeRoutes);

// ✅ SINGLE CLEAN LAB ROUTE
app.use("/api/labs", labRoute);

/* ----------------------- Health Check ----------------------- */

app.get("/", (req, res) => {
  res.json({
    message: "Production Management Inventory API running"
  });
});

/* ----------------------- MongoDB ----------------------- */

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

connectDB();

/* ----------------------- Start Server ----------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});