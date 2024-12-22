import express from "express";
import { checkAuth, login, register } from "../controllers/auth.controller.js";
import { authenticate } from "../midlleware/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth",authenticate,checkAuth);

export default router;
