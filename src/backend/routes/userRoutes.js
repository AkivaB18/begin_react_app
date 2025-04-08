// Updated user routes with consistent authentication
// Save as src/backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { 
  hashPassword, 
  comparePassword, 
  generateToken, 
  verifyToken 
} = require('../utils/authUtils');

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token using our centralized utility
      const decoded = verifyToken(token);

      // Get user from decoded token
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Trim username to avoid whitespace issues
    const trimmedUsername = username.trim();
    
    // Check if user already exists
    const userExists = await User.findOne({ 
      username: { $regex: new RegExp(`^${trimmedUsername}$`, 'i') } 
    });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password using our centralized utility
    const hashedPassword = await hashPassword(password);
    console.log('Registration - Password hashed successfully');

    // Create new user
    const newUser = await User.create({
      username: trimmedUsername,
      password: hashedPassword,
      pantryItems: [],
    });

    console.log(`User registered: ${trimmedUsername} (ID: ${newUser._id})`);

    // Generate token using our centralized utility
    const token = generateToken(newUser._id);

    // Return user data with token
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      pantryItems: newUser.pantryItems,
      token: token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Trim username to avoid whitespace issues
    const trimmedUsername = username.trim();
    
    console.log(`Login attempt for username: "${trimmedUsername}"`);

    // Find user with case-insensitive matching
    const user = await User.findOne({ 
      username: { $regex: new RegExp(`^${trimmedUsername}$`, 'i') } 
    });

    // Check if user exists
    if (!user) {
      console.log(`User not found: ${trimmedUsername}`);
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    console.log(`User found with ID: ${user._id}`);

    // Check password using our centralized utility
    const isMatch = await comparePassword(password, user.password);
    console.log(`Password comparison result: ${isMatch}`);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate token using our centralized utility
    const token = generateToken(user._id);
    console.log('Login successful, token generated');

    // Return user data with token
    res.json({
      _id: user._id,
      username: user.username,
      pantryItems: user.pantryItems || [],
      token: token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    res.json({
      _id: req.user._id,
      username: req.user.username,
      pantryItems: req.user.pantryItems || [],
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update pantry items
// @route   PUT /api/users/pantry
// @access  Private
router.put('/pantry', protect, async (req, res) => {
  try {
    const { pantryItems } = req.body;

    if (!pantryItems) {
      return res.status(400).json({ message: 'No pantry items provided' });
    }

    // Update pantry items
    req.user.pantryItems = pantryItems;
    const updatedUser = await req.user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      pantryItems: updatedUser.pantryItems,
    });
  } catch (error) {
    console.error('Update pantry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Test endpoint to check if a user exists (for debugging only)
router.get('/test-user/:username', async (req, res) => {
  try {
    const username = req.params.username;
    
    // Find the user but don't return the password
    const user = await User.findOne({ 
      username: { $regex: new RegExp(`^${username}$`, 'i') } 
    }).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return basic info without sensitive data
    res.json({
      exists: true,
      _id: user._id,
      username: user.username,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Error in test endpoint:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Testing helper - DELETE THIS BEFORE PRODUCTION
router.delete('/test-cleanup/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const result = await User.deleteOne({ username });
    
    res.json({
      message: `Deleted ${result.deletedCount} user(s) with username ${username}`,
      success: result.deletedCount > 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error cleaning up test user', error: error.message });
  }
});

module.exports = router;