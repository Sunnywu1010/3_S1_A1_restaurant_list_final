const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect("mongodb://localhost/3_S1_A1_restaurant_list_final");
db.on("error", () => {
  console.log("mongodb error");
});
db.once("open", () => {
  console.log("mongodb connected");
});

module.exports = db;
