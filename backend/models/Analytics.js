const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll',
      required: true,
      unique: true,
    },
    totalResponses: {
      type: Number,
      default: 0,
    },
    authenticatedResponses: {
      type: Number,
      default: 0,
    },
    anonymousResponses: {
      type: Number,
      default: 0,
    },
    questionStats: [
      {
        questionId: String,
        questionText: String,
        totalAnswers: Number,
        optionStats: [
          {
            optionId: String,
            optionText: String,
            count: Number,
            percentage: Number,
          },
        ],
      },
    ],
    participationByDate: [
      {
        date: Date,
        count: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analytics', analyticsSchema);
