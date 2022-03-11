const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const usePassport = require("./config/passport");
const methodOverride = require("method-override");
const routes=require('./routes');
const port = 3000;
require('./config/mongoose')

const app = express();
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(methodOverride('_method'))
  usePassport(app);
  
  app.use(routes)


app.listen(port, () => {
  console.log(`http://lacalhost:${port}`);
});
