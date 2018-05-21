var express = require('express');
var router = express.Router();
var sql = require('../auxiliary/mySql.js');
/* GET users listing. */
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

router.post('/login', function(request, response,next){	
  sql.adminLogin('loginTable',request.body,function(result){
    	response.send(result);
	})	
});
module.exports = router;
