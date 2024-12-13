var express = require('express');
var router = express.Router();
const User = require('../models/User');  // Ensure the correct path to the User model

// GET route for the registration page
router.get('/', function(req, res) {
  res.render('register', { title: 'Aniquiz | Register' });
});

// POST route to handle user registration
router.post('/', (req, res) => {
  const { username, password, email } = req.body;

  // Check if the user already exists
  User.findOne({ $or: [{ username }, { email }] })
    .then(user => {
      if (user) {
        return res.status(400).send('Username or Email already exists');
      }

      // Create a new user without hashing the password
      const newUser = new User({
        username,
        password, // Store plain text password (NOT recommended for production)
        email,
        score: { easy: 0, medium: 0, hard: 0 }
      });

      // Save the new user to the database
      newUser
        .save()
        .then(user => {
          res.status(201).redirect('/login'); // Redirect to the login page or wherever you want
        })
        .catch(err => {
          console.error(err);
          res.status(500).send('Server error');
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server error');
    });
});

module.exports = router;
