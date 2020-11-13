const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "accountNumber", passwordField: "pin" },
      async function (username, password, done) {
        const user = await User.findOne({ accountNumber: username });
        if (!user) {
          return done(null, false);
        }
        try {
          if (password == user.pin) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (e) {
          return done(e);
        }
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
