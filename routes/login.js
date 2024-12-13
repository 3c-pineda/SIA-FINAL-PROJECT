const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET route for rendering login page
router.get('/', async (req, res) => {
  res.render('login', { 
    title: 'Aniquiz | Login',
    message: req.query.message || ''  // Message passed via query string
  });
});

// POST route for handling login logic
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect('/login?message=User not found');  // Redirect with error message in query string
    }

    // Compare the entered password with the one stored in the database
    if (user.password !== password) {
      return res.redirect('/login?message=Incorrect password');  // Redirect with error message in query string
    }

    // If login is successful, redirect to profile and pass user data as query params
    res.redirect(`/profile?userId=${user._id}&message=Login successful`);
  } catch (error) {
    console.error('Error:', error);
    res.redirect('/login?message=Internal server error');  // Redirect with error message in query string
  }
});

module.exports = router;
