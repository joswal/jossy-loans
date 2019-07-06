const express = require('express');
const {
  Users
} = require('../routes/users');
const loans = require('../routes/loans');
const requests = require('../routes/requests');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/users', Users);
  app.use('/api/loans', loans);
  app.use('/api/requests', requests);
  app.use(error);
}