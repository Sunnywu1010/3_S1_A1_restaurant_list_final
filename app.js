// 使用 require 載入 Express
// 並且把載入的 express 套件在執行後，存成一個名為 app 的變數
// 先定義要使用連接埠號 (port number) ，預設 3000
const express = require("express");
// 設定在 Express 中使用的樣版引擎
const exphbs = require("express-handlebars");
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
