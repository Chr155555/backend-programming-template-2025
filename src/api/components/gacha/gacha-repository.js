const models = require('../../../models');

const Prize = models.prizes || models.prize || models.Prize;
const GachaHistory =
  models.gacha_histories || models['gacha-histories'] || models.GachaHistory;
const User = models.users || models.user || models.User;

async function countUserGachaToday(userId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return GachaHistory.countDocuments({
    user_id: userId,
    gacha_date: {
      $gte: today,
      $lt: tomorrow,
    },
  });
}

async function getAvailablePrizes() {
  return Prize.find({ remaining_quota: { $gt: 0 } });
}

async function decreasePrizeQuota(prizeId) {
  return Prize.updateOne({ _id: prizeId }, { $inc: { remaining_quota: -1 } });
}

async function recordGachaHistory(userId, prizeId, isWin) {
  const history = new GachaHistory({
    user_id: userId,
    prize_id: prizeId,
    is_win: isWin,
  });
  return history.save();
}

async function getUserHistory(userId) {
  return GachaHistory.find({ user_id: userId }).populate({
    path: 'prize_id',
    select: 'name',
    model: Prize,
  });
}

async function getAllPrizes() {
  return Prize.find({});
}

async function getWinners() {
  const histories = await GachaHistory.find({ is_win: true }).populate({
    path: 'prize_id',
    select: 'name',
    model: Prize,
  });

  const winners = [];
  for (let i = 0; i < histories.length; i++) {
    const history = histories[i];
    let userName = 'Unknown';

    if (User && history.user_id) {
      const userDoc = await User.findById(history.user_id);
      if (userDoc) {
        userName =
          userDoc.name || userDoc.username || userDoc.email || 'Unknown';
      }
    }

    winners.push({
      user_id: { name: userName },
      prize_id: history.prize_id,
      gacha_date: history.gacha_date,
    });
  }

  return winners;
}

module.exports = {
  countUserGachaToday,
  getAvailablePrizes,
  decreasePrizeQuota,
  recordGachaHistory,
  getUserHistory,
  getAllPrizes,
  getWinners,
};
