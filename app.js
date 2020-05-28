const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to mongoDB');
  })
  .catch((error) => {
    console.error('error connecting to mongoDB: ', error.message);
  });

const app = express();

const daysInMilliseconds = 30 * 24 * 60 * 60 * 1000; //one day in milliseconds

app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    maxAge: daysInMilliseconds,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/', billingRoutes);

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = app;
