import express from "express";
import {
  getAllCoursesForStudent,
  getCourseDetailsForStudent,
} from "../controllers/studentCourse.controller.js";
const router = express.Router();

router.get("/get", getAllCoursesForStudent);
router.get("/getDetails/:id/:userId", getCourseDetailsForStudent);

export default router;
