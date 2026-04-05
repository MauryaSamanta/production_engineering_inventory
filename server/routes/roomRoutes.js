// routes/roomRoutes.js
import express from "express";
import Room from "../models/Room.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

export default router;