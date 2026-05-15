const { verifyToken } = require('../utils/tokenUtils');
const Poll = require('../models/Poll');
const { calculateAnalytics } = require('../utils/analyticsUtils');

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    // Join poll room
    socket.on('join-poll', async (data) => {
      try {
        const { pollId, token } = data;

        let user = null;
        if (token) {
          user = verifyToken(token);
        }

        socket.join(`poll_${pollId}`);
        console.log(`User joined poll room: poll_${pollId}`);

        // Send current analytics
        try {
          const analytics = await calculateAnalytics(pollId);
          socket.emit('analytics-update', {
            pollId,
            analytics,
          });
        } catch (error) {
          console.error('Error sending initial analytics:', error);
        }
      } catch (error) {
        console.error('Error joining poll:', error);
        socket.emit('error', { message: 'Failed to join poll' });
      }
    });

    // Update analytics in real-time
    socket.on('response-submitted', async (data) => {
      try {
        const { pollId } = data;

        const analytics = await calculateAnalytics(pollId);

        // Broadcast updated analytics to all users in the poll room
        io.to(`poll_${pollId}`).emit('analytics-update', {
          pollId,
          analytics,
        });
      } catch (error) {
        console.error('Error broadcasting analytics update:', error);
      }
    });

    // Leave poll room
    socket.on('leave-poll', (data) => {
      const { pollId } = data;
      socket.leave(`poll_${pollId}`);
      console.log(`User left poll room: poll_${pollId}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = socketHandler;
