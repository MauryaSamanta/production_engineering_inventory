import Labs from "../models/Labs.js";
import mongoose from "mongoose";

/* ---------------- CREATE LAB (ADMIN ONLY) ---------------- */

export const createLab = async (req, res) => {
  try {
    const { name, type } = req.body;

    

    // Validation
    if (!name) {
      return res.status(400).json({
        message: "Lab name is required"
      });
    }

    // Create lab
    const lab = await Labs.create({
      name,
      type,
      createdBy: {
      user: new mongoose.Types.ObjectId(req.user.id)
      }
    });

    return res.status(201).json({
      message: "Lab created successfully",
      lab
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};