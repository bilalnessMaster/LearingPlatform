import express from "express";
import {
  getCurrentProgress,
  markProgress,
  restProgress,
} from "../controllers/progress.controller.js";
const router = express.Router();

router.get("/get/:userId/:courseId", getCurrentProgress);
router.post("/mark-lecture-viewed", markProgress);
router.post("/reset-progress", restProgress);

export default router;
