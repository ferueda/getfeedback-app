const authRoutes = require('express').Router();
const passport = require('passport');

authRoutes.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);
authRoutes.get('/google/callback', passport.authenticate('google'));

authRoutes.get('/facebook', passport.authenticate('facebook'));
authRoutes.get('/facebook/callback', passport.authenticate('facebook'));

module.exports = authRoutes;
