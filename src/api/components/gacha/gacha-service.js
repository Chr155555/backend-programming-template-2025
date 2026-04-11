const gachaRepository = require('./gacha-repository');
const { error400 } = require('../../../core/errors');

function maskName(name) {
  if (!name) return 'Unknown';
  return name
    .split(' ')
    .map((word) => {
      if (word.length <= 1) return word;
      if (word.length === 2) return `${word[0]}*`;
      return word[0] + '*'.repeat(word.length - 2) + word[word.length - 1];
    })
    .join(' ');
}

async function playGacha(userId) {
  const todayCount = await gachaRepository.countUserGachaToday(userId);

  if (todayCount >= 5) {
    throw error400('Limit gacha harian sudah habis (maksimal 5x).');
  }

  let isWin = Math.random() < 0.2;
  let selectedPrize = null;

  if (isWin) {
    const availablePrizes = await gachaRepository.getAvailablePrizes();

    if (availablePrizes.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePrizes.length);
      selectedPrize = availablePrizes[randomIndex];

      await gachaRepository.decreasePrizeQuota(selectedPrize._id);
    } else {
      isWin = false;
    }
  }

  const prizeId = selectedPrize ? selectedPrize._id : null;
  await gachaRepository.recordGachaHistory(userId, prizeId, isWin);

  if (isWin) {
    return {
      isWin: true,
      message: `Selamat! Anda mendapatkan ${selectedPrize.name}`,
      prize: selectedPrize.name,
    };
  }

  return {
    isWin: false,
    message: 'Maaf, Anda belum beruntung kali ini.',
    prize: null,
  };
}

async function getUserHistory(userId) {
  const histories = await gachaRepository.getUserHistory(userId);
  return histories.map((h) => ({
    date: h.gacha_date,
    isWin: h.is_win,
    prize: h.prize_id ? h.prize_id.name : 'Zonk',
  }));
}

async function getAllPrizes() {
  return gachaRepository.getAllPrizes();
}

async function getWinners() {
  const winners = await gachaRepository.getWinners();
  return winners.map((w) => ({
    userName: maskName(w.user_id ? w.user_id.name : 'Unknown'),
    prize: w.prize_id ? w.prize_id.name : 'Unknown',
    date: w.gacha_date,
  }));
}

module.exports = {
  playGacha,
  getUserHistory,
  getAllPrizes,
  getWinners,
};
