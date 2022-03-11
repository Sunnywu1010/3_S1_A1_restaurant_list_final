const express = require("express");
const router = express.Router();
const home = require("./modules/home");
const users = require("./modules/users"); 
const restaurants = require("./modules/restaurants");


router.use("/", home);
router.use("/restaurants", restaurants);
router.use("/users", users); 

module.exports = router;
