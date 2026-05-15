const Analytics = require('../models/Analytics');
const Poll = require('../models/Poll');
const { calculateAnalytics } = require('../utils/analyticsUtils');

exports.getAnalytics = async (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Check authorization - allow if creator or results are published
    if (
      poll.creator.toString() !== req.user?.userId &&
      !poll.resultsPublished
    ) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const analytics = await calculateAnalytics(pollId);

    res.status(200).json({ analytics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPublicAnalytics = async (req, res) => {
  try {
    const { shareUrl } = req.params;

    const poll = await Poll.findOne({ shareUrl });

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    if (!poll.resultsPublished) {
      return res
        .status(403)
        .json({ error: 'Results are not yet published' });
    }

    const analytics = await calculateAnalytics(poll._id);

    res.status(200).json({
      poll: {
        id: poll._id,
        title: poll.title,
        description: poll.description,
      },
      analytics,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
