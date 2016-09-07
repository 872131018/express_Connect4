var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var cube = req.cube;
  res.render('index', {
      title: 'Connect7x7x7',
      cube: cube
  });
});

module.exports = router;
