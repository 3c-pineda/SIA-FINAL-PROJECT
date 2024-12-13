var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('category', { title: 'Aniquiz | Category' });
});

module.exports = router;
