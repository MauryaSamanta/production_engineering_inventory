import mongoose from "mongoose";

const ChangeRequestSchema = new mongoose.Schema({

  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Asset",
    required: true
  },

  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  changeType: {
    type: String,
    required: true
  },

  newData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  approvedAt: {
    type: Date
  }

}, { timestamps: true });


export default mongoose.model("ChangeRequest", ChangeRequestSchema);