import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";

await mongoose.connect(
  "mongodb+srv://testUser:12345@cluster0.ivvqkp6.mongodb.net/production_engineering"
);

const password = await bcrypt.hash("admin123", 10);

const admin = await User.create({
  name: "Admin",
  email: "admin@prod.com",
  password: password,
  role: "admin"
});

console.log("Admin user created:");
console.log(admin);

mongoose.disconnect();