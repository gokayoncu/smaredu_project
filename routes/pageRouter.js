const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.route("/").get(pageController.getHomePage);
router.route("/about").get(pageController.getAboutPage);
router.route("/courses").get(pageController.getCoursesPage);
router.route("/dashboard").get(pageController.getDashboardPage);
router.route("/contact").get(pageController.getContactPage);

module.exports = router;
