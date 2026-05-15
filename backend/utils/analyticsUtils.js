const Response = require('../models/Response');
const Analytics = require('../models/Analytics');
const Poll = require('../models/Poll');

exports.calculateAnalytics = async (pollId) => {
  try {
    const responses = await Response.find({ poll: pollId });
    const poll = await Poll.findById(pollId);

    if (!poll) {
      throw new Error('Poll not found');
    }

    const totalResponses = responses.length;
    const authenticatedResponses = responses.filter(
      (r) => r.respondent && !r.anonymous
    ).length;
    const anonymousResponses = responses.filter((r) => r.anonymous).length;

    const questionStats = poll.questions.map((question) => {
      const questionResponses = responses.filter((r) =>
        r.answers.some((a) => a.questionId === question._id)
      );

      const optionStats = question.options.map((option) => {
        const count = questionResponses.filter((r) =>
          r.answers.some(
            (a) =>
              a.questionId === question._id && a.selectedOption === option._id
          )
        ).length;

        return {
          optionId: option._id,
          optionText: option.text,
          count,
          percentage:
            questionResponses.length > 0
              ? ((count / questionResponses.length) * 100).toFixed(2)
              : 0,
        };
      });

      return {
        questionId: question._id,
        questionText: question.text,
        totalAnswers: questionResponses.length,
        optionStats,
      };
    });

    let analytics = await Analytics.findOne({ poll: pollId });

    if (!analytics) {
      analytics = new Analytics({
        poll: pollId,
        totalResponses,
        authenticatedResponses,
        anonymousResponses,
        questionStats,
      });
    } else {
      analytics.totalResponses = totalResponses;
      analytics.authenticatedResponses = authenticatedResponses;
      analytics.anonymousResponses = anonymousResponses;
      analytics.questionStats = questionStats;
    }

    await analytics.save();
    return analytics;
  } catch (error) {
    console.error('Error calculating analytics:', error);
    throw error;
  }
};

exports.getPollAnalytics = async (pollId) => {
  try {
    const analytics = await Analytics.findOne({ poll: pollId });
    if (!analytics) {
      return await exports.calculateAnalytics(pollId);
    }
    return analytics;
  } catch (error) {
    console.error('Error getting analytics:', error);
    throw error;
  }
};
