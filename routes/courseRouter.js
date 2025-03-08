const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.route("/").post(courseController.createCourse);
// router.route("/about").get(courseController.getAboutPage);
// router.route("/courses").get(courseController.getCoursesPage);
// router.route("/dashboard").get(courseController.getDashboardPage);
// router.route("/contact").get(courseController.getContactPage);

module.exports = router;
