// Updated authentication middleware
// Save as src/backend/middleware/authMiddleware.js

const User = require('../models/userModel');
const { verifyToken } = require('../utils/authUtils');

const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token using our centralized utility
      const decoded = verifyToken(token);
      console.log(`Token verified for user ID: ${decoded.id}`);

      // Get user from token without returning password
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        console.log(`User not found for ID: ${decoded.id}`);
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      console.log(`User authenticated: ${req.user.username}`);
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log('No authorization token provided');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };