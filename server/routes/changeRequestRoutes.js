import express from "express";

import {
  createChangeRequest,
  getPendingRequests,
  approveChange,
  rejectChange
} from "../controllers/changeRqeuestController.js"

import { auth, adminOnly, adminOrSubAdmin } from "../middlewares/auth.js";

const router = express.Router();

/* subadmin creates request */

router.post("/", auth, createChangeRequest);

/* admin views pending requests */

router.get("/pending", auth, adminOrSubAdmin, getPendingRequests);

/* admin approves */

router.patch("/approve/:id", auth, adminOnly, approveChange);

/* admin rejects */

router.patch("/reject/:id", auth, adminOnly, rejectChange);

export default router;