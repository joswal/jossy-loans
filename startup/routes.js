const express = require('express');
const users = require('../routes/users');
const loans = require('../routes/loans');
const requests = require('../routes/requests');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/loans', loans);
  app.use('/api/auth', auth);
  app.use('/api/requests', requests);
  app.use(error);
}