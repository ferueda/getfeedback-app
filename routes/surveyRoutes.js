const surveyRoutes = require('express').Router();
const requireLogin = require('../middleware/requireLogin');

surveyRoutes.post('/', requireLogin, async (req, res) => {});

module.exports = surveyRoutes;
