const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const passport = require("passport");
const bcrypt = require("bcryptjs");

//set the router of login page : GET and POST
router.get("/login", (req, res) => {
  res.render("login");
});
// use authenticate (which is the method provide by passport)
// to auth login or not
// if success: go to home page
// if fail: go back to login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    
  })
);
//set the router of register page : GET and POST
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  // get user info
  const { name, email, password, confirmPassword } = req.body;
  // error flash message
  const errors = [];

  if (!email || !password || !confirmPassword) {
    errors.push({
      message: "Email and Password must be filled to proceed.",
    });
  }
  if (password !== confirmPassword) {
    errors.push({
      message: "The two passwords must match to proceed.",
    });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }
  // check user register already or not
  // findOne() should be found by OBJECT
  User.findOne({ email }).then((user) => {
    // User already exists
    if (user) {
      errors.push({ message: "Email already in the database." });

      // back to register page and show the info that user typed in
      return res.render("register", {
        errors,
        name,
        email,
        password,
        confirmPassword,
      });
    }

    return bcrypt
      .genSalt(10) // salt: complex index 10
      .then((salt) => bcrypt.hash(password, salt)) // create hash with salt
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash, //hash which is created to be password
        })
      )
      .then(() => res.redirect("/"))
      .catch((err) => console.log(err));
  });
});
// logout page
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You logged out successfully.");
  res.redirect("/users/login");
});
module.exports = router;
