// 使用 require 載入 Express
const express = require("express");
// 設定在 Express 中使用的樣版引擎
const exphbs = require("express-handlebars");
// 載入 mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/2-3_A7_restaurant_list");
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error");
});
db.once("open", () => {
  console.log("mongodb connected");
});

const app = express();
const restaurantList = require("./models/restaurant");
const port = 3000;

// app.engine：定義要使用的樣板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// 靜態檔案，
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET "/" 瀏覽所有餐廳
app.get("/", (req, res) => {
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

// 瀏覽特定餐廳
app.get("/restaurants/:id", (req, res) => {
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
app.get("/search", (req, res) => {
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
app.get("/restaurant/new", (req, res) => {
  res.render("new");
});

app.post("/restaurants", (req, res) => {
  return restaurantList
    .create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => {
      console.log(error);
    });
});

// 刪除餐廳
app.post("/restaurant/:id/delete", (req, res) => {
  const id = req.params.id;
  return restaurantList
    .findById(id)
    .then((restaurant) => {
      restaurant.remove();
    })
    .then(()=>{res.redirect('/')})
    .catch((error) => {
      console.log(error);
    });
});

// 啟動並監聽伺服器
app.listen(port, () => {
  console.log(`http://lacalhost:${port}`);
});
