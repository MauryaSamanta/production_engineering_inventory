// models/Room.js
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },

  type: {
    type: String,
    enum: ["lab", "classroom", "seminar_hall", "office"],
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Room", roomSchema);