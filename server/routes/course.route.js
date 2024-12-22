import express from 'express'
import { addNewCourse, GetAllCourse, GetCourseById, updateCourseById } from '../controllers/course.controller.js';
const router = express.Router();



router.post('/add' ,addNewCourse)
router.get('/allCourse',GetAllCourse)
router.get('/course-details/:id',GetCourseById)
router.put('/update/:id',updateCourseById)


export default router;