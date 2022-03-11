const express = require("express");
const router = express.Router();
const User = require("../../models/user");
//set the router of login page : GET and POST
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res) => {});

//set the router of register page : GET and POST
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  // get user info
  const { name, email, password, confirmPassword } = req.body;
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
module.exports = router;
