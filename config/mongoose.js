const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect("mongodb://localhost/2-3_A7_restaurant_list");
db.on("error", () => {
  console.log("mongodb error");
});
db.once("open", () => {
  console.log("mongodb connected");
});

module.exports=db