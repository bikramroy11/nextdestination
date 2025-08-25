const express = require("express");
const router=express.Router();
const asyncWrap = require("../utils/asyncWrap");
const ExpressError = require("../utils/ExpressError");
const User=require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const { signupUser, signupUserForm } = require("../controllers/userController");

const userController=require("../controllers/userController");
//signup user------------------
router.route("/signup")
    .get(userController.renderSignupUserForm)
    .post(asyncWrap(userController.signupUser));

//login user------------------
router.route("/login")
    .get( userController.renderLoginUserForm)
    .post(saveRedirectUrl,
        passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash: true
        }), 
        userController.loginUser
    );

//logout user--------------
router.get("/logout", userController.logoutUser);

module.exports=router;