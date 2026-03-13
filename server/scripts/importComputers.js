import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import Asset from "../models/Asset.js";

await mongoose.connect(
  "mongodb+srv://testUser:12345@cluster0.ivvqkp6.mongodb.net/production_engineering"
);

console.log("Connected to MongoDB");

function clean(text) {
  if (!text) return null;

  return text
    .replace(/\uFFFD/g, "")
    .replace(/�/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const computers = [];

fs.createReadStream("./data/computers.csv", { encoding: "utf8" })
  .pipe(csv())
  .on("data", (row) => {
    try {
      const serial = clean(row["Serial number"]);

      if (!serial) return;

      const parts = serial.split("/");
      const name = parts[3] || "Computer";

      computers.push({
        serialNumber: serial,

        name: name,

        category: "Computer",

        subCategory: "Desktop",

        lab: clean(row["Room"]),

        specs: {
          ram: clean(row["RAM"]),
          os: clean(row["OS"]),
          processor: clean(row["Processor"]),
          graphicsCard: clean(row["Graphics_card"]),
          storage: clean(row["Storage"]),
          systemType: clean(row["System_type"])
        },

        manufacturer: null,

        yearOfManufacture: null,

        situation: "working",

        image: null,

        type: "non_consumable"
      });
    } catch (err) {
      console.log("Row error:", err);
    }
  })

  .on("end", async () => {
    try {
      const inserted = await Asset.insertMany(computers, { ordered: false });

      console.log(`Imported ${inserted.length} computers`);
    } catch (err) {
      console.log("Insert error:", err.message);
    }

    mongoose.disconnect();
  });