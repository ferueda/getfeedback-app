const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
require('./models/User');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

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
app.use(
  cookieSession({
    maxAge: daysInMilliseconds,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.post('/create-payment-intent', async (req, res) => {
  // const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500,
    currency: 'usd',
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = app;
