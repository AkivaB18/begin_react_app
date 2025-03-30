// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updatePantryItems,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', authUser);
router.post('/register', registerUser);

// Protected routes (require authentication)
router.route('/profile').get(protect, getUserProfile);
router.route('/pantry').put(protect, updatePantryItems);

module.exports = router;