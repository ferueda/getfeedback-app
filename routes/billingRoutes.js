const billingRoutes = require('express').Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');
require('../models/User');

billingRoutes.post('/api/stripe', requireLogin, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '$5 for 5 credits',
    source: req.body.id,
  });

  req.user.credits += 5;
  const user = await req.user.save();
  res.json(user);
});

module.exports = billingRoutes;
