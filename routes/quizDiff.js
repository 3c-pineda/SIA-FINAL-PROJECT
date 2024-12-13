var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('quizDiff', { title: 'Aniquiz | Quiz Difficulties' });
});

module.exports = router;