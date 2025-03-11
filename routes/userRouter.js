const express = require("express");
const router = express.Router();
const userController = require("../controllers/authController");
const authController = require("../controllers/authController");

router.route("/signup").post(userController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authController.getDashboardPage);

module.exports = router;
