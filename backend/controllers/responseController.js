const Response = require('../models/Response');
const Poll = require('../models/Poll');
const { calculateAnalytics } = require('../utils/analyticsUtils');

exports.submitResponse = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { answers, anonymous } = req.body;

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Check if poll can accept responses
    if (!poll.canAcceptResponses()) {
      return res.status(400).json({ error: 'Poll is not accepting responses' });
    }

    // Validate answers
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'At least one answer is required' });
    }

    // Validate mandatory questions
    const mandatoryQuestions = poll.questions.filter((q) => q.mandatory);
    const answeredQuestionIds = answers.map((a) => a.questionId);

    for (const question of mandatoryQuestions) {
      if (!answeredQuestionIds.includes(question._id.toString())) {
        return res
          .status(400)
          .json({ error: `Question "${question.text}" is mandatory` });
      }
    }

    // Check for duplicate responses
    if (!poll.anonymous && req.user) {
      const existingResponse = await Response.findOne({
        poll: pollId,
        respondent: req.user.userId,
        anonymous: false,
      });

      if (existingResponse) {
        return res
          .status(400)
          .json({ error: 'You have already responded to this poll' });
      }
    }

    // Create response
    const response = new Response({
      poll: pollId,
      respondent: req.user?.userId || null,
      anonymous: anonymous || !req.user,
      answers,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    await response.save();

    // Update poll
    poll.totalResponses += 1;

    if (!anonymous && req.user) {
      if (!poll.respondents.includes(req.user.userId)) {
        poll.respondents.push(req.user.userId);
      }
    } else {
      const anonymousId = `anon_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      poll.anonymousRespondents.push(anonymousId);
    }

    await poll.save();

    // Recalculate analytics
    await calculateAnalytics(pollId);

    res.status(201).json({
      message: 'Response submitted successfully',
      response: {
        id: response._id,
        poll: response.poll,
        answers: response.answers,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResponsesByPoll = async (req, res) => {
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

    const responses = await Response.find({ poll: pollId })
      .populate('respondent', 'username email firstName lastName')
      .sort({ createdAt: -1 });

    res.status(200).json({ responses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteResponse = async (req, res) => {
  try {
    const { responseId } = req.params;

    const response = await Response.findById(responseId);

    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }

    const poll = await Poll.findById(response.poll);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Check authorization
    if (poll.creator.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Update poll response count
    poll.totalResponses -= 1;

    // Remove from respondents
    if (response.respondent) {
      poll.respondents = poll.respondents.filter(
        (id) => id.toString() !== response.respondent.toString()
      );
    }

    await poll.save();
    await Response.findByIdAndDelete(responseId);

    // Recalculate analytics
    await calculateAnalytics(response.poll);

    res.status(200).json({ message: 'Response deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
