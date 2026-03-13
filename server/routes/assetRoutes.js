import express from "express";
import { getAssetsByLab, searchAssets } from "../controllers/assetController.js";
import { adminOrSubAdmin, auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/lab/:lab", getAssetsByLab);
router.get("/search", auth, adminOrSubAdmin, searchAssets);
export default router;