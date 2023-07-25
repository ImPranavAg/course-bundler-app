import express from "express";
import {
  getAllCourses,
  createCourse,
  getCourseLectures,
  addLecture,
  deleteCourse,
  deleteLecture,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import {
  authorizeAdmin,
  authorizeSubscribers,
  isAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

// get all courses without lectures
router.route("/courses").get(getAllCourses);

// create new course - 'admin' specific
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// add lecture, delete course, get course details
router
  .route("/course/:id")
  .get(isAuthenticated, authorizeSubscribers, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// delete lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;
