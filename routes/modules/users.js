const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const passport = require("passport");
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
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "All information is needed!。" });
  }
  if (password !== confirmPassword) {
    errors.push({
      message: "The confirm password is not match as the password!",
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
      console.log("User already exists.");
      // back to register page and show the info that user typed in
      res.render("register", {
        name,
        email,
        password,
        confirmPassword,
      });
    } else {
      // if not, create in mongoose
      return User.create({
        name,
        email,
        password,
      })
        .then(() => res.redirect("/")) //whether exist or not go back to homepage
        .catch((err) => console.log(err));
    }
  });
});
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Logout already!。");
  res.redirect("/users/login");
});
module.exports = router;
