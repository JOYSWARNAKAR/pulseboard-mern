const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const {
  validateUserRegistration,
  validateUserLogin,
  handleValidationErrors,
} = require('../middleware/validation');

// Public routes
router.post(
  '/register',
  validateUserRegistration,
  handleValidationErrors,
  register
);
router.post(
  '/login',
  validateUserLogin,
  handleValidationErrors,
  login
);

// Protected routes
router.get('/me', authenticate, getCurrentUser);

module.exports = router;
