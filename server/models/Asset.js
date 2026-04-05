import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({

  serialNumber: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    
  },

  category: {
  type: String,
  // enum: [
  //   "Machine",
  //   "Tool",
  //   "Computer",
  //   "Furniture",
  //   "Office",
  //   "Automation",
  //   "Lab Equipment",
  //   "Scrap"
  // ]
},

  lab: String,

  specs: mongoose.Schema.Types.Mixed,

  manufacturer: String,

  yearOfManufacture: Number,

  situation: {
    type: String,
    // enum: ["working","not_working","under_repair"]
  },

  image: {
    type: String,
    default: null
  },

  type: {
    type: String,
    enum: ["consumable","non_consumable"],
    default: "non_consumable"
  }

}, { timestamps: true });

export default mongoose.model("Asset", AssetSchema);