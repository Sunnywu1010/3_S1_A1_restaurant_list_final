const express = require("express");
const router = express.Router();
const restaurantList = require("../../models/restaurant");
router.get("/", (req, res) => {
  const userId = req.user._id;
  restaurantList
    .find({ userId })
    .lean()
    .then((restaurants) => {
      res.render("index", { restaurants });
    })
    .catch((error) => {
      console.log(error);
    });
});
// sort function
router.get("/sort", (req, res) => {
  const userId = req.user._id;
  const [property, sortBy] = req.query.sort.split("_");
  restaurantList
    .find({ userId })
    .lean()
    .sort({ [property]: sortBy })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});
// set routes of add restaurant page
router.get("/new", (req, res) => {
  res.render("new");
});


// search
router.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const userId = req.user._id;
  if (!keyword) {
    res.redirect("/");
  }
  return restaurantList
    .find({ userId })
    .lean()
    .then((restaurants) => {
      const restaurantSearch = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      );
      res.render("index", { restaurants: restaurantSearch, keyword });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
