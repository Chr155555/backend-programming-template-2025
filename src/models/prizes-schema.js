module.exports = (mongoose) => {
  const prizesSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    total_quota: {
      type: Number,
      required: true,
    },
    remaining_quota: {
      type: Number,
      required: true,
    },
  });

  return mongoose.model('prizes', prizesSchema);
};
