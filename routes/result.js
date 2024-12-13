var express = require('express');

var router = express.Router();
var axios = require('axios');
router.post('/', async (req, res) => {
  try {
    // Retrieve the correct answers and questions passed via hidden fields
    const correctanswers = JSON.parse(req.body.correctanswers);  // Correct field name
    const questions = JSON.parse(req.body.questions);            // Correct field name
    const diff = req.body.difficulty;

    // Prepare an array to store user answers, with "unanswered" as the default for skipped questions
    const useranswers = questions.map((_, index) => {
      const useranswer = req.body[`question-${index + 1}`];
      return useranswer || 'unanswered';
    });

    // Calculate the score
    let score = 0;
    correctanswers.forEach((correctanswer, index) => {           // Corrected from foreach() to forEach()
      if (useranswers[index] === correctanswer) {
        score++;
      }
    });

    // Store the score based on the difficulty in the database
    const userId = req.session.userId;  // Assuming you store the user ID in session
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        // Update the score based on the difficulty
        if (diff === 'easy') {
          user.scores.easy = score;
        } else if (diff === 'medium') {
          user.scores.medium = score;
        } else if (diff === 'hard') {
          user.scores.hard = score;
        }

        // Save the user data after updating the score
        await user.save();
      }
    }

    // Render the result page with all required data
    res.render('result', {
      title: 'aniquiz | results',
      score,
      totalquestions: questions.length,
      useranswers,
      correctanswers,
      questions
    });
  } catch (error) {
    console.error('Error processing quiz results:', error);
    res.status(500).send('Error processing quiz results');
  }
});
