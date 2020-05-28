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
const User = mongoose.model('users');

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

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

const calculateOrderAmount = (items) => {
  const prices = {
    credits: 990,
  };
  return prices[items.id] * items.amount;
};

app.post('/api/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    metadata: {
      userID: req.user.id,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post('/webhook', async (req, res) => {
  const event = req.body;
  console.log(event);

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      const user = await User.findById(paymentIntent.metadata.userID);
      if (user) {
        user.credits += 5;
        await user.save();
      }
      console.log(paymentIntent);
      break;
    default:
      return res.status(400).end();
  }

  res.json({ received: true });
});

module.exports = app;
