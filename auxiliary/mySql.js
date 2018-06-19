
var mysql = require('mysql');
var DATABASE = 'chat';
var config=require('../config.js')
var connection;

function openSql() {
	connection = mysql.createConnection({
		host: config.sqlConfig.host,
		user: config.sqlConfig.user,
		password: config.sqlConfig.password,
		port: config.sqlConfig.port,
		database: config.sqlConfig.database
	});
}
module.exports = {
// 客服登录模块
	adminLogin: function(_collection, data, callback) {
		openSql();
		connection.connect();
		console.log(data);
		var userGetSql = 'SELECT * FROM ' + _collection + ' WHERE user_code = "' + data.loginName + '" AND ' + ' password = "'+ data.password +'"';
		connection.query(userGetSql, function(err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				callback(false);
				return;
			}
			else {
				callback(result);
			}
		});
		connection.end();
	},
	// 注册客服
	addCust: function(_collection, data, callback) {
		openSql();
		connection.connect();
		var userAddSql = "INSERT INTO " + _collection + " VALUES ('" + data.userCode + "','" + data.userName + "','" + data.password +"','"  + data.phone + "','" + data.e_mail + "','" + data.state + "','" + data.reamrk + "')";
		
		console.log(userAddSql)

		connection.query(userAddSql, function(err, result) {
			if (err) {
				console.log('[INSERT ERROR] - ', err.message);
				return;
			}
			console.log('插入成功')
			callback(true)
		})
		connection.end();
	},
	userList: (_collection, callback) => {
		openSql();
		connection.connect();
		var userAddSql = userGetSql = 'SELECT * FROM ' + _collection + ' WHERE user_state = "1"';
		connection.query(userAddSql, function(err, result) {
			if (err) {
				console.log('[INSERT ERROR] - ', err.message);
				return;
			}
			callback(result);
		})
		connection.end();
	}
}