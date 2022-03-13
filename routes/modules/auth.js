const express = require("express");
const router = express.Router();

const passport = require("passport");
// ask from facebook for user's email and public_profile
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile"],
  })
);
// display the info that callback by facebook
// success: go to home page
// fail: go to login page
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);
module.exports = router;
