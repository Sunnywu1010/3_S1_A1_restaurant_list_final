// 使用 require 載入 Express
const express = require("express");
// 設定在 Express 中使用的樣版引擎
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const restaurantList = require("./models/restaurant");
const routes=require('./routes');
const router = require("./routes/modules/home");
const port = 3000;
require('./config/mongoose')

const app = express();
// app.engine：定義要使用的樣板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride('_method'))
app.use(routes)


// 啟動並監聽伺服器
app.listen(port, () => {
  console.log(`http://lacalhost:${port}`);
});
