const gachaService = require('./gacha-service');

async function playGacha(req, res, next) {
  try {
    const userId = req.body.user_id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'user_id wajib dikirimkan dalam body request',
      });
    }

    const result = await gachaService.playGacha(userId);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

async function getHistory(req, res, next) {
  try {
    const userId = req.query.user_id || req.body.user_id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'user_id wajib dikirimkan',
      });
    }

    const data = await gachaService.getUserHistory(userId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
}

async function getPrizes(req, res, next) {
  try {
    const data = await gachaService.getAllPrizes();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
}

async function getWinners(req, res, next) {
  try {
    const data = await gachaService.getWinners();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  playGacha,
  getHistory,
  getPrizes,
  getWinners,
};
