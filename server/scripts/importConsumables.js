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
    .replace(/\uFFFD/g, "")
    .replace(/�/g, "x")
    .replace(/\?/g, ":")
    .replace(/×/g, "x")
    .trim();
}

/* ---------------- Import Script ---------------- */

const tools = [];

fs.createReadStream("./data/tools.csv", { encoding: "utf8" })
  .pipe(csv())
  .on("data", (row) => {
    try {
      const serial = cleanText(row["Sl no"]);
      if (!serial) return;

      const name = cleanText(row["Item"]);
      const specs = cleanText(row["Specs"]);

      const total = Number(row["Total"]) || 0;
      const working = Number(row["Working"]) || 0;
      const notWorking = Number(row["Not working"]) || 0;

      tools.push({
        serialNumber: serial, // already unique now

        name,

        lab: cleanText(row["Lab"]),

        category: "Tool",
        subCategory: name,

        specs: {
          description: specs
        },

        quantity: total,
        workingCount: working,
        notWorkingCount: notWorking,

        type: "consumable" // 🔥 forced as per your requirement
      });

    } catch (err) {
      console.log("Row error:", err);
    }
  })

  .on("end", async () => {
    try {
      const inserted = await Asset.insertMany(tools, {
        ordered: false
      });

      console.log(`Imported ${inserted.length} tools`);
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