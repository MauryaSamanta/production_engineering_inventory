import express from 'express';
import { createLab } from '../controllers/labsController.js';
import {auth, adminOnly} from '../middlewares/auth.js';

const router = express.Router();

router.post("/", auth, adminOnly, (req, res, next) => {
  console.log("🔥 LAB ROUTE HIT");
  next();
}, createLab);

export default router;