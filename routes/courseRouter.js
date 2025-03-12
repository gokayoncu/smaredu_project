const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const roleMiddlewares = require("../middlewares/roleMiddlewares");

router.route("/").post(roleMiddlewares(['admin','teacher']),courseController.createCourse);
router.route("/").put(courseController.editCourse);
router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse);
router.route("/:slug").delete(courseController.deleteCourse);
router.route("/:slug").put(courseController.updateCourse);
router.route("/enroll").post(courseController.enrollCourse);
router.route("/release").post(courseController.releaseCourse);

module.exports = router;
