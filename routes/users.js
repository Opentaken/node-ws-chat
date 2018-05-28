var express = require('express');
var router = express.Router();
var sql = require('../auxiliary/mySql.js');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login/save', function(req, res, next) {
  req.session.info = {
    userName: req.body.name,
    userCode: req.body.code
  }
  console.log(req.session.info)
  res.send(req.session.info);
});
router.get('/login/get', function(req, res, next) {
  res.send(req.session.info);
});

router.post('/login', function(req, res,next){	
  sql.adminLogin('loginTable',req.body,function(result){
    req.session.info = {
      userName: req.body.name,
      userCode: req.body.code
    }
    	res.send(result);
	})	
});

router.post('/register', function(req, res, next){
  sql.addCust('chat_customer_service',req.body,function(result){
    req.session.info = {
      userName: req.body.name,
      userCode: req.body.code
    }
    	res.send(result);
	})
})
module.exports = router;
