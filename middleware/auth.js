module.exports = {
  authenticator: (req, res, next) => {
    // req.isAuthenticated() :return boolean
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("warning_msg", "Please login first!");
    res.redirect("/users/login");
  },
};
