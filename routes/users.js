var express = require('express');
var router = express.Router();
// var sql = require('../auxiliary/mySql.js');
const userinfo = require('../controls/user-info')

//登陆
router.post('/login', userinfo.login);
//注册
router.post('/register', userinfo.register);

module.exports = router;
