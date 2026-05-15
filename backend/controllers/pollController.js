const Poll = require('../models/Poll');
const Response = require('../models/Response');
const { calculateAnalytics } = require('../utils/analyticsUtils');

exports.createPoll = async (req, res) => {
  try {
    const { title, description, questions, anonymous, expiryDate } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res
        .status(400)
        .json({ error: 'Title and at least one question are required' });
    }

    const expiry = new Date(expiryDate);
    if (expiry <= new Date()) {
      return res
        .status(400)
        .json({ error: 'Expiry date must be in the future' });
    }

    // Format questions with order
    const formattedQuestions = questions.map((q, index) => ({
      text: q.text,
      mandatory: q.mandatory !== false,
      options: q.options.map((opt, optIndex) => ({
        text: opt,
        order: optIndex,
      })),
      order: index,
    }));

    const poll = new Poll({
      title,
      description,
      creator: req.user.userId,
      questions: formattedQuestions,
      anonymous,
      expiryDate: expiry,
    });

    await poll.save();

    // Initialize analytics
    await calculateAnalytics(poll._id);

    res.status(201).json({
      message: 'Poll created successfully',
      poll: {
        id: poll._id,
        title: poll.title,
        description: poll.description,
        shareUrl: poll.shareUrl,
        questions: poll.questions,
        anonymous: poll.anonymous,
        active: poll.active,
        expiryDate: poll.expiryDate,
        resultsPublished: poll.resultsPublished,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPollsByUser = async (req, res) => {
  try {
    const polls = await Poll.find({ creator: req.user.userId })
      .select('-respondents -anonymousRespondents')
      .sort({ createdAt: -1 });

    res.status(200).json({ polls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPollByShareUrl = async (req, res) => {
  try {
    const { shareUrl } = req.params;

    const poll = await Poll.findOne({ shareUrl })
      .select('-respondents -anonymousRespondents');

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    res.status(200).json({
      poll: {
        id: poll._id,
        title: poll.title,
        description: poll.description,
        questions: poll.questions,
        anonymous: poll.anonymous,
        active: poll.active,
        expiryDate: poll.expiryDate,
        resultsPublished: poll.resultsPublished,
        totalResponses: poll.totalResponses,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPollById = async (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Check authorization
    if (poll.creator.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.status(200).json({ poll });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { title, description, questions, anonymous, expiryDate } = req.body;

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Check authorization
    if (poll.creator.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Can't update if poll has responses
    if (poll.totalResponses > 0) {
      return res
        .status(400)
        .json({ error: 'Cannot update poll with responses' });
    }

    if (title) poll.title = title;
    if (description) poll.description = description;
    if (typeof anonymous === 'boolean') poll.anonymous = anonymous;

    if (expiryDate) {
      const expiry = new Date(expiryDate);
      if (expiry <= new Date()) {
        return res
          .status(400)
          .json({ error: 'Expiry date must be in the future' });
      }
      poll.expiryDate = expiry;
    }

    if (questions) {
      poll.questions = questions.map((q, index) => ({
        text: q.text,
        mandatory: q.mandatory !== false,
        options: q.options.map((opt, optIndex) => ({
          text: opt,
          order: optIndex,
        })),
        order: index,
      }));
    }

    await poll.save();

    res.status(200).json({
      message: 'Poll updated successfully',
      poll,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.publishResults = async (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Check authorization
    if (poll.creator.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    poll.resultsPublished = true;
    await poll.save();

    res.status(200).json({
      message: 'Results published successfully',
      poll,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.closePoll = async (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Check authorization
    if (poll.creator.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    poll.active = false;
    await poll.save();

    res.status(200).json({
      message: 'Poll closed successfully',
      poll,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePoll = async (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Check authorization
    if (poll.creator.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Poll.findByIdAndDelete(pollId);
    await Response.deleteMany({ poll: pollId });

    res.status(200).json({ message: 'Poll deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
