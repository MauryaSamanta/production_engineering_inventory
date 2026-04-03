import express from 'express';
import { getLabs } from '../controllers/getLabsController.js';
import {auth} from '../middlewares/auth.js';

const router = express.Router();

router.get("/labs", auth, getLabs);

export default router;