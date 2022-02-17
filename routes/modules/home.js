const express = require("express");
const router = express.Router();
const restaurantList = require("../../models/restaurant");
router.get("/", (req, res) => {
  restaurantList
    .find()
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
  const [property, sortBy] = req.query.sort.split("_");
  restaurantList
    .find()
    .lean()
    .sort({ [property]: sortBy })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});
// 新增餐廳
router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res) => {
  return restaurantList
    .create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => {
      console.log(error);
    });
});

// search
router.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    res.redirect("/");
  }
  return restaurantList
    .find()
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
