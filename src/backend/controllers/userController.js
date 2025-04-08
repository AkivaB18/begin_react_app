// backend/controllers/userController.js
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        pantryItems: user.pantryItems,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user pantry items
// @route   PUT /api/users/pantry
// @access  Private
const updatePantryItems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.pantryItems = req.body.pantryItems || user.pantryItems;
      
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        pantryItems: updatedUser.pantryItems,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserProfile, updatePantryItems };