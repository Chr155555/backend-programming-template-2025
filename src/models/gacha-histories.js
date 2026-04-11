module.exports = (mongoose) => {
  const gachaHistoriesSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    prize_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'prizes',
      default: null,
    },
    is_win: {
      type: Boolean,
      required: true,
      default: false,
    },
    gacha_date: {
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model('gacha_histories', gachaHistoriesSchema);
};
