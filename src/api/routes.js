const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const gachaRoutes = require('./components/gacha/gacha-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  gachaRoutes(app);

  return app;
};
