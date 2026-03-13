import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secretKey",
    { expiresIn: "7d" }
  );

  res.json({
    token,
    role: user.role,
    name: user.name
  });

};

export const createSubAdmin = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "subadmin"
    });

    res.json(user);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error creating subadmin"
    });

  }

};

export const promoteToAdmin = async (req, res) => {

  const user = await User.findById(req.params.id);

  user.role = "admin";

  await user.save();

  res.json({ message: "User promoted to admin" });

};

export const approveChange = async (req, res) => {

  const request = await ChangeRequest.findById(req.params.id);

  request.status = "approved";

  await Asset.findByIdAndUpdate(
    request.assetId,
    request.newData
  );

  await request.save();

  res.json({ message: "Change approved" });
};

export const getAllUsers = async (req, res) => {

  try {

    const users = await User.find({})
      .select("-password")   // hide password
      .sort({ createdAt: -1 });

    res.json({
      total: users.length,
      users
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error fetching users"
    });

  }

};