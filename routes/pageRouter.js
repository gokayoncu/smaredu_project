const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const redirectMiddlewares = require("../middlewares/redirectMiddlewares");

router.route("/").get(pageController.getHomePage);
router.route("/about").get(pageController.getAboutPage);
router.route("/register").get(redirectMiddlewares,pageController.getRegisterPage);
router.route("/login").get(redirectMiddlewares,pageController.getLoginPage);
router.route("/contact").get(pageController.getContactPage);
router.route("/contact").post(pageController.sendEmail);
module.exports = router;
