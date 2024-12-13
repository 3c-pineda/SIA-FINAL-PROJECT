var express = require('express');

var router = express.Router();
var axios = require('axios');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

router.get('/:difficulty', async function(req, res) {
  try {
    const { difficulty } = req.params;
    const url = `https://opentdb.com/api.php?amount=10&category=31&difficulty=${difficulty}&type=multiple`;
    const resp = await axios.get(url);
    let questions = resp.data.results;
    const correctAnswers = questions.map(question => question.correct_answer);
    questions = questions.map(question => {
      const answers = [...question.incorrect_answers, question.correct_answer];
      question.answers = shuffle(answers);
      return question;
    });
    res.render('quiz', { title: 'Aniquiz | Quiz', questions, correctAnswers, difficulty: difficulty });
  } catch (error) {
    res.status(500).send('Error retrieving data from OpenTDB');
  }
});

