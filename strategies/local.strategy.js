const userController = require("../controllers/user.controller");
const LocalStrategy = require("passport-local");
const passport = require("passport");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userController
    .getUserById(id)
    .then((user) => {
      if (!user) {
        done(null, false);
        return;
      }

      done(null, user);
    })
    .catch((err) => {
      console.log(err);
      done(err, false);
    });
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    userController
      .getUser(username)
      .then((user) => {
        if (!user) {
          done(null, false);
          return;
        }

        if (user.password == password) done(null, user);
      })
      .catch((err) => {
        console.log(err);
        done(err, false);
      });
  })
);
