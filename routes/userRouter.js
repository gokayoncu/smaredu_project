const express = require("express");
const { body } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const userController = require("../controllers/authController");
const authController = require("../controllers/authController");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.route("/signup").post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'),


        body('email').isEmail().withMessage('Please Enter Valid Email')
        .custom((userEmail)=> {
            return User.findOne({email:userEmail}).then(user => {
                if (user) {
                    return Promise.reject('Email is already exists!')
                }
            })
        }),

        body('password').not().isEmpty().withMessage('Please Enter A Password'),
    ],userController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddlewares,authController.getDashboardPage);
router.route('/:id').delete(authController.getDeleteUser);

module.exports = router;
