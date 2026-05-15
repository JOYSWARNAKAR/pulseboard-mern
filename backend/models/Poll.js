const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const questionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  text: {
    type: String,
    required: [true, 'Question text is required'],
  },
  mandatory: {
    type: Boolean,
    default: true,
  },
  options: [
    {
      _id: {
        type: String,
        default: () => uuidv4(),
      },
      text: {
        type: String,
        required: true,
      },
      order: Number,
    },
  ],
  order: {
    type: Number,
    required: true,
  },
});

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Poll title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shareUrl: {
      type: String,
      unique: true,
      sparse: true,
    },
    questions: [questionSchema],
    anonymous: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    expiryDate: {
      type: Date,
      required: [true, 'Poll expiry date is required'],
    },
    resultsPublished: {
      type: Boolean,
      default: false,
    },
    totalResponses: {
      type: Number,
      default: 0,
    },
    respondents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    anonymousRespondents: [String], // For anonymous tracking
  },
  { timestamps: true }
);

// Generate share URL before saving
pollSchema.pre('save', function (next) {
  if (!this.shareUrl) {
    this.shareUrl = `poll_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }
  next();
});

// Check if poll is expired
pollSchema.methods.isExpired = function () {
  return new Date() > this.expiryDate;
};

// Check if poll can accept responses
pollSchema.methods.canAcceptResponses = function () {
  return this.active && !this.isExpired();
};

module.exports = mongoose.model('Poll', pollSchema);
