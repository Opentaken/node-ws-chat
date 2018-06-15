var express = require('express');
var router = express.Router();
const userinfo = require('../controls/user-info')

//登陆
router.post('/login', userinfo.login);
//注册
router.post('/register', userinfo.register);

module.exports = router;
