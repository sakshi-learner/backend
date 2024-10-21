const express =require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userCotroller = require("../controllers/user.js");


//signup route
router.route("/signup")
.get( userCotroller.renderSignupform)
.post( wrapAsync(userCotroller.signup));

//login route
router.route("/login")
.get( userCotroller.renderLoginForm)
.post(saveRedirectUrl,
 passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash: true
    }),
    userCotroller.login
);

//logout
router.get("/logout",userCotroller.logout );

module.exports = router;