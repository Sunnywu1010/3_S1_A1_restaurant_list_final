const express = require("express");
const router = express.Router();
const restaurantList = require("../../models/restaurant");

router.get("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  return restaurantList
    .findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
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
// add restaurant
router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res) => {
  const userId = req.user._id;
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  return restaurantList
    .create({
      name,
      name_en,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description,
      userId,
    })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

// edit restaurant
router.get("/:id/edit", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  return restaurantList
    .findOne({ _id, userId })
    .lean()
    .then((restaurant) => {
      res.render("edit", { restaurant });
    })
    .catch((error) => {
      console.log(error);
    });
});
router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;

  return restaurantList
    .findOne({ _id, userId })
    .then((restaurant) => {
      restaurant.name = name;
      restaurant.name_en = name_en;
      restaurant.category = category;
      restaurant.image = image;
      restaurant.location = location;
      restaurant.phone = phone;
      restaurant.google_map = google_map;
      restaurant.rating = rating;
      restaurant.description = description;
      return restaurant.save();
    })
    .then(() => {
      res.redirect(`/restaurants/${_id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

// 刪除餐廳
router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  return restaurantList
    .findOne({ _id, userId })
    .then((restaurant) => {
      restaurant.remove();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
