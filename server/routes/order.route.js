import express from "express";
import { authenticate } from "../midlleware/auth.middleware.js";
import {
  checkPayment,
  createPayment,
} from "../controllers/order.controller.js";
const router = express.Router();

router.post("/create", authenticate, createPayment);
router.post("/check-payment", authenticate, checkPayment);

export default router;
