import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  adminGetAll,
  createWilaya,
  updateWilaya,
  deleteWilaya,
} from "../controllers/wilayas.controller.js";

const router = express.Router();
router.use(verifyToken);

router.get("/", adminGetAll);
router.post("/", createWilaya);
router.put("/:id", updateWilaya);
router.delete("/:id", deleteWilaya);

export default router;
