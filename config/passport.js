const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
module.exports = (app) => {
  // initialize Passport module
  app.use(passport.initialize());
  app.use(passport.session());
  // determine if user exist
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered!",
            });
          }
          if (user.password !== password) {
            return done(null, false, {
              message: "Email or Password incorrect.",
            });
          }
          return done(null, user);
        })
        .catch((err) => done(err, false));
    })
  );
  // set serializeUser and deserializeUser
  // serializeUser: if user exist, set user.id in to session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // deserializeUser: if need user info, then find it by user.id
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};