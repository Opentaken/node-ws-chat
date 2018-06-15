
var mysql = require('../auxiliary/mySql.js');

module.exports = {
  login: (req, res, next) => {
    mysql.adminLogin('chat_user',req.body,function(result){
      req.session.info = {
        userName: req.body.name,
        userCode: req.body.code
      }
        res.send(result);
    })
  },
  register: (req, res, next) => {
    sql.addCust('chat_user',req.body,function(result){
      req.session.info = {
        userName: req.body.name,
        userCode: req.body.code
      }
        res.send(result);
    })
  }
}