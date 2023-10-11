const mongoose = require("mongoose");

const analyticsSchema = mongoose.Schema({
  totalUsers: {
    type: Number,
    required: true,
  },
  successCount: {
    type: Number,
    required: true,
  },
  failureCount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Analytics", analyticsSchema);
