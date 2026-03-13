import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import Asset from "../models/Asset.js";

/* ---------------- MongoDB Connection ---------------- */

await mongoose.connect(
  "mongodb+srv://testUser:12345@cluster0.ivvqkp6.mongodb.net/production_engineering"
);

console.log("Connected to MongoDB");

/* ---------------- Helpers ---------------- */

function cleanText(text) {
  if (!text) return null;

  return text
    .replace(/\uFFFD/g, "") // remove replacement chars
    .replace(/�/g, "x")
    .replace(/\?/g, ":")
    .replace(/×/g, "x")
    .trim();
}

function detectCategory(serial) {
  const parts = serial.split("/");
  const machineType = parts[3]?.toUpperCase();

  const mapping = {
    LATHE: { category: "Machine", subCategory: "Lathe" },
    MILLING: { category: "Machine", subCategory: "Milling Machine" },
    SHAPER: { category: "Machine", subCategory: "Shaper" },
    DRILLING: { category: "Machine", subCategory: "Drilling Machine" },
    GRINDER: { category: "Machine", subCategory: "Grinding Machine" },
    HOBBER: { category: "Machine", subCategory: "Gear Hobber" },
    POWERPRESS: { category: "Machine", subCategory: "Power Press" },

    ROBOT: { category: "Automation", subCategory: "Robot" },
    CONVEYER: { category: "Automation", subCategory: "Conveyor" },

    PRINTER: { category: "Office", subCategory: "Printer" },

    "3DPRINTER": { category: "Machine", subCategory: "3D Printer" },

    MICROSCOPE: { category: "Lab Equipment", subCategory: "Microscope" },

    SCRAP: { category: "Scrap", subCategory: "Scrap Item" }
  };

  return mapping[machineType] || {
    category: "Machine",
    subCategory: machineType
  };
}

/* ---------------- Import Script ---------------- */

const machines = [];

fs.createReadStream("./data/machines.csv", { encoding: "utf8" })
  .pipe(csv())
  .on("data", (row) => {
    try {
      const serial = cleanText(row["sl.no."]);

      if (!serial) return;

      const { category, subCategory } = detectCategory(serial);

      const machineName = serial.split("/")[3];

      machines.push({
        serialNumber: serial,

        name: machineName,

        lab: cleanText(row["Lab"]),

        category,
        subCategory,

        specs: {
          description: cleanText(row["Specifications"])
        },

        manufacturer: cleanText(row["Manufacturer/Model-Name"]),

        yearOfManufacture: Number(row["year of manufacture"]) || null,

        situation: cleanText(row["situation"]),

        image: cleanText(row["image"]) || null,

        type: "non_consumable"
      });
    } catch (err) {
      console.log("Row error:", err);
    }
  })

  .on("end", async () => {
    try {
      const inserted = await Asset.insertMany(machines, {
        ordered: false
      });

      console.log(`Imported ${inserted.length} machines`);
    } catch (err) {

  console.log("Insert error:");

  if (err.writeErrors) {
    err.writeErrors.forEach((e) => {
      console.log(e.errmsg);
      console.log(e.err.op);
      console.log("----------------");
    });
  } else {
    console.log(err);
  }
}

    mongoose.disconnect();
  });