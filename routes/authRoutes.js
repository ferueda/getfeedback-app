const authRoutes = require('express').Router();
const passport = require('passport');

authRoutes.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

authRoutes.get('/google/callback', passport.authenticate('google'));

module.exports = authRoutes;
