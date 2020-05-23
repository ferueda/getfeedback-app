const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleID: profile.id });

        if (!existingUser) {
          const newUser = new User({
            googleID: profile.id,
          });

          const returnedUser = await newUser.save();
          done(null, returnedUser);
        }
        done(null, existingUser);
      } catch (e) {
        console.log(e.message);
      }
    }
  )
);
