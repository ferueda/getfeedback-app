const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const mongoose = require('mongoose');
const surveyRoutes = require('express').Router();
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

surveyRoutes.get('/thanks', (req, res) => {
  res.send('Thanks for voting!!');
});

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

  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (error) {
    res.status(422).send(error);
  }
});


surveyRoutes.post('/webhooks', (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice');

  _.chain(req.body)
    .map(({ url, email }) => {
      const match = p.test(new URL(url).pathname);

      if (match) {
        const { surveyId, choice } = match;

        return {
          email,
          surveyId,
          choice,
        };
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: {
              email: email,
              responded: false,
            },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date(),
        }
      ).exec();
    })
    .value();
});
module.exports = surveyRoutes;
