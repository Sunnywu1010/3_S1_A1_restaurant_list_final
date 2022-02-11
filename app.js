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
const restaurantList = require("./restaurant.json");
const port = 3000;

// app.engine：定義要使用的樣板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// 靜態檔案，
app.use(express.static("public"));

// 使用 Express 傳送回應給使用者
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

// params
app.get("/restaurants/:restaurants_id", (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurants_id
  );
  res.render("show", { restaurants: restaurant });
});

// search
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurant = restaurantList.results.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  );

  res.render("index", {
    restaurants: restaurant,
    keyword: keyword,
  });
});

// 啟動並監聽伺服器
app.listen(port, () => {
  console.log(`http://lacalhost:${port}`);
});
