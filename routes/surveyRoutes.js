const mongoose = require('mongoose');
const surveyRoutes = require('express').Router();
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

const Survey = mongoose.model('Survey');

surveyRoutes.post('/', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  survey.save();
});

module.exports = surveyRoutes;
