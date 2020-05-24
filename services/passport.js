const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  //this id is the mongoDB ID, not the google ID.
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleID: profile.id });

        if (!existingUser) {
          const newUser = new User({
            googleID: profile.id,
          });

          const savedUser = await newUser.save();
          done(null, savedUser);
        }
        done(null, existingUser);
      } catch (error) {
        console.log(error.message);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email'],
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ facebookID: profile.id });

        if (!existingUser) {
          const newUser = new User({
            facebookID: profile.id,
          });

          const savedUser = await newUser.save();
          done(null, savedUser);
        }

        done(null, existingUser);
      } catch (error) {
        console.error(error.message);
      }
    }
  )
);
