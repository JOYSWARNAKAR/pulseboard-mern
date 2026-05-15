const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema(
  {
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll',
      required: true,
    },
    respondent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    anonymous: {
      type: Boolean,
      default: false,
    },
    answers: [
      {
        questionId: {
          type: String,
          required: true,
        },
        selectedOption: {
          type: String,
          required: true,
        },
      },
    ],
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

// Index for quick lookups
responseSchema.index({ poll: 1, respondent: 1 });
responseSchema.index({ poll: 1, createdAt: 1 });

module.exports = mongoose.model('Response', responseSchema);
