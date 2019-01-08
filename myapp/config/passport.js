const LocalStrategy = require("passport-local").Strategy;
const usersModel = require("../models/users.js");
const bcrypt = require("bcryptjs");

module.exports = function(passport) {
  // Local Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "user_name",
        passwordField: "password"
      },
      function(username, password, done) {
        // Match Username

        let query = { user_name: username };
        usersModel.helpers.getUser({ where: query }).then(user => {
          // if (err) throw err;
          if (!user) {
            return done(null, false, { message: "No user found" });
          }
          // Match Password
          bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Wrong password" });
            }
          });
        });
      }
    )
  );
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    usersModel.helpers.getUserByID(id).then((user, err) => {
      done(err, user);
    });
  });
};
