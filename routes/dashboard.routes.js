import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import { getDashboardStats } from '../controllers/dashboard.controller.js';

const router = express.Router();
router.use(verifyToken);
router.get('/', getDashboardStats);

export default router;
