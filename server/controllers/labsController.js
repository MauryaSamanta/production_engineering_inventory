import Labs from "../models/Labs.js";
import mongoose from "mongoose";

/* ---------------- GET ALL LABS ---------------- */
export const getLabs = async (req, res) => {
  try {
    const labs = await Labs.find();

    res.status(200).json(labs);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching labs",
      error: error.message
    });
  }
};

/* ---------------- CREATE LAB ---------------- */
export const createLab = async (req, res) => {
  try {
    const { name, type } = req.body;

    // ✅ Validation
    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Lab name is required"
      });
    }

    if (!type || type === "None") {
      return res.status(400).json({
        message: "Valid lab type is required"
      });
    }

    // ✅ Prevent duplicates (optional but recommended)
    const existing = await Labs.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({
        message: "Lab already exists"
      });
    }

    // ✅ Create lab
    const lab = await Labs.create({
      name: name.trim(),
      type,
      createdBy: {
        user: new mongoose.Types.ObjectId(req.user.id)
      }
    });

    // 🔥 IMPORTANT: return FULL OBJECT (fixes your UI issue)
    return res.status(201).json(lab);

  } catch (error) {
    return res.status(500).json({
      message: "Error creating lab",
      error: error.message
    });
  }
};

/* ---------------- DELETE LAB ---------------- */
export const deleteLab = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid lab ID"
      });
    }

    const deletedLab = await Labs.findByIdAndDelete(id);

    if (!deletedLab) {
      return res.status(404).json({
        message: "Lab not found"
      });
    }

    return res.status(200).json({
      message: "Lab deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting lab",
      error: error.message
    });
  }
};