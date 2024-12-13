var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('aboutMe', { title: 'Aniquiz | About Me' });
});

module.exports = router;
