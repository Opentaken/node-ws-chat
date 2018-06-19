var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/callback', function(req, res, next) {
  res.render('callback', { title: 'Express' });
});
router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'Express' });
});
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/list', function(req, res, next) {
  res.render('list', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

module.exports = router;
