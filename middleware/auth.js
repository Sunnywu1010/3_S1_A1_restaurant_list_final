module.exports = {
  authenticator: (req, res, next) => {
    // req.isAuthenticated() :return boolean
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login");
  },
};
