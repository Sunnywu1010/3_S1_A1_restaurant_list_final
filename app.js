const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const usePassport = require("./config/passport");
const methodOverride = require("method-override");
const flash = require("connect-flash"); 
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const routes=require('./routes');
const port = process.env.PORT;
require('./config/mongoose')

const app = express();
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(methodOverride('_method'))
  usePassport(app);
  app.use(flash());
  app.use((req, res, next) => {
    console.log(req.user) 
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user;
    res.locals.success_msg = req.flash("success_msg"); 
    res.locals.warning_msg = req.flash("warning_msg"); 
    res.locals.error_msg = req.flash("error_msg"); 
    next();
  });
  app.use(routes)


app.listen(port, () => {
  console.log(`http://lacalhost:${port}`);
});
