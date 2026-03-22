import mongoose from "mongoose";

const LabsSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  createdBy: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },

  type: {
    type: String,
    enum: ["Class", "Lab", "Office", "None"],
    default: "None"
  }

}, { timestamps: true });

export default mongoose.model("Labs", LabsSchema);