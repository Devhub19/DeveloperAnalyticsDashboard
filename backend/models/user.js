const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
  },
  successCount: {
    type: Number,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  requestData: {
    type: Object,
    default: null,
  },
  responseData: {
    type: Object,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
