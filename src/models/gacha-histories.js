module.exports = (db) =>
  db.model(
    'gacha_histories',
    db.Schema({
      user_id: {
        type: db.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      prize_id: {
        type: db.Schema.Types.ObjectId,
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
    })
  );
