import express from "express";
import { getAllWilayas } from "../controllers/wilayas.controller.js";

const router = express.Router();
router.get("/", getAllWilayas);

export default router;
