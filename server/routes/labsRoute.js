import express from "express";
import { createLab, getLabs, deleteLab } from "../controllers/labsController.js";
import { auth, adminOnly } from "../middlewares/auth.js";

const router = express.Router();

/* -------- GET ALL LABS -------- */
router.get("/", auth, getLabs);

/* -------- CREATE LAB -------- */
router.post("/", auth, adminOnly, createLab);

/* -------- DELETE LAB -------- */
router.delete("/:id", auth, adminOnly, deleteLab);

export default router;