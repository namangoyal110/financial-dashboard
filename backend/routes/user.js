const express = require('express');
const User = require('../models/User');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Update Income and Goals
router.post('/update', verifyToken, async (req, res) => {
  const { income, goals } = req.body;

  try {
    const user = await User.findById(req.user.id);
    user.income = income;
    user.goals = goals;
    await user.save();
    res.status(200).send('User information updated successfully');
  } catch (error) {
    res.status(500).send('Error updating user information');
  }
});

// Get Smart Saving Suggestions
router.get('/suggestions', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const suggestions = generateSavingSuggestions(user.income, user.goals);
    res.status(200).json({ suggestions });
  } catch (error) {
    res.status(500).send('Error fetching saving suggestions');
  }
});

function generateSavingSuggestions(income, goals) {
  // Dummy implementation of AI-based suggestions
  const savings = income * 0.2;
  return `Based on your goals, you should save ${savings} per month.`;
}

module.exports = router;