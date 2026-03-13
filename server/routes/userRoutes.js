import express from "express";
import { createSubAdmin, getAllUsers, promoteToAdmin } from "../controllers/loginController.js";
import { auth, adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.post("/subadmin", auth, adminOnly, createSubAdmin);
router.get("/", auth, adminOnly, getAllUsers);
router.patch("/promote/:id", auth, adminOnly, promoteToAdmin);

export default router;