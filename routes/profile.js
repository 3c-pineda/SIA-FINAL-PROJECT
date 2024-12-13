var express = require('express');
var router = express.Router();
const User = require('../models/User');  // Assuming you have a User model

// Profile route to display user information
router.get('/', async function(req, res) {
  try {
    const userId = req.query.userId || req.session.userId;

    if (!userId) {
      return res.redirect('/login');  // Redirect to login if userId is missing
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.redirect('/login');  // Redirect if user not found
    }

    // Set default scores if not present
    const scores = user.scores || {
      easy: 0,
      medium: 0,
      hard: 0
    };

    res.render('profile', {
      title: 'Aniquiz | Profile',
      user: user,
      scores: scores  // Pass dynamic scores to the template
    });

  } catch (error) {
    console.error('Error fetching user data:', error);
    res.redirect('/login');
  }
});

// Handle form submission for profile update
router.post('/', async function(req, res) {
  try {
    const userId = req.query.userId || req.session.userId;

    if (!userId) {
      return res.redirect('/login');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.redirect('/login');
    }

    // Update user fields based on the form data
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;  // Ideally hash the password before saving

    // Save the updated user info to the database
    await user.save();

    // Fetch updated scores (if necessary)
    const scores = user.scores || {
      easy: 0,
      medium: 0,
      hard: 0
    };

    // Render the profile page with updated data
    res.render('profile', {
      title: 'Aniquiz | Profile',
      user: user,
      scores: scores
    });

  } catch (error) {
    console.error('Error updating user data:', error);
    res.redirect('/login');
  }
});

module.exports = router;
