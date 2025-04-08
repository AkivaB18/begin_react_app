// This file contains consolidated authentication logic to ensure
// consistent password hashing between registration and login.
// Save as src/backend/utils/authUtils.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Get JWT secret from environment variables or use fallback
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production';

// Standardized salt rounds for bcrypt
const SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt with consistent salt rounds
 * @param {string} password - Plain text password to hash
 * @returns {Promise<string>} - Hashed password
 */
const hashPassword = async (password) => {
  try {
    // Generate a salt with fixed number of rounds for consistency
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    
    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Password hashing failed');
  }
};

/**
 * Compare a plain text password with a hashed password
 * @param {string} plainPassword - Plain text password to check
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} - True if passwords match
 */
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    // Use bcrypt's compare method to check if passwords match
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Password comparison failed');
  }
};

/**
 * Generate a JWT token for a user
 * @param {string} userId - User ID to include in token
 * @returns {string} - JWT token
 */
const generateToken = (userId) => {
  try {
    // Create a token with 30 day expiration
    return jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: '30d',
    });
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Token generation failed');
  }
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token to verify
 * @returns {object} - Decoded token payload
 */
const verifyToken = (token) => {
  try {
    // Verify and decode the token
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Token verification failed');
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  SALT_ROUNDS
};