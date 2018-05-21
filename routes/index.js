var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'Express' });
});
router.get('/', function(req, res, next) {
  console.log("....")
  res.render('login', { title: 'Express' });
});
router.get('/list', function(req, res, next) {
  res.render('list', { title: 'Express' });
});

module.exports = router;
