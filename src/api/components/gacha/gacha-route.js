const express = require('express');
const gachaControllers = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/', gachaControllers.playGacha);
  route.get('/history', gachaControllers.getHistory);
  route.get('/prizes', gachaControllers.getPrizes);
  route.get('/winners', gachaControllers.getWinners);
};
