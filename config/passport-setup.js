const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback
      User.findOne({ googleId: profile.id }).then(existUser => {
        if (existUser) {
          console.log(`User exists already ${existUser}`);
          done(null, existUser);
        } else {
          const user = new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture
          });
          user.save().then(newUser => {
            console.log(`New user created: ${newUser}`);
            done(null, newUser);
          });
        }
        console.log(profile);
      });
    }
  )
);
