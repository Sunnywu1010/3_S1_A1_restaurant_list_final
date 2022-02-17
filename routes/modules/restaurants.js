const express = require("express");
const router = express.Router();
const restaurantList = require("../../models/restaurant");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  return restaurantList
    .findById(id)
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
// 編輯餐廳
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  return restaurantList
    .findById(id)
    .lean()
    .then((restaurant) => {
      res.render("edit", { restaurant });
    })
    .catch((error) => {
      console.log(error);
    });
});
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const name_en = req.body.name_en;
  const category = req.body.category;
  const image = req.body.image;
  const location = req.body.location;
  const phone = req.body.phone;
  const google_map = req.body.google_map;
  const rating = req.body.rating;
  const description = req.body.description;

  return restaurantList
    .findById(id)
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
      res.redirect(`/restaurants/${id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

// 刪除餐廳
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return restaurantList
    .findById(id)
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
