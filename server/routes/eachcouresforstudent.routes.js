import express from "express";
import { authenticate } from "../midlleware/auth.middleware.js";
import { getStudentCoursesbyuserId } from "../controllers/student-courses.controller.js";

const router = express.Router();

router.get("/get-student-courses/:id", authenticate, getStudentCoursesbyuserId);
export default router;