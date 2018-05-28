
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
// 管理员登录模块
	adminLogin: function(_collection, data, callback) {
		openSql();
		connection.connect();
		console.log(data);
		var userGetSql = 'SELECT * FROM ' + _collection + ' WHERE loginName = "' + data.loginName + '" AND ' + ' password = "'+ data.password +'"';
		connection.query(userGetSql, function(err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				callback(false);
				return;
			}
			else {
				console.log(result)
				callback(result);
			}
		});
		connection.end();
	},
	// 注册客服
	addCust: function(_collection, data, callback) {
		openSql();
		connection.connect();
		console.log(data)
		var userAddSql = "INSERT INTO " + _collection + " VALUES ('" + data.custId + "','" + data.custName + "','" + data.login_name +"','" + data.custPassword + "','" + data.custPhone + "','" + data.e_mail + "','" + data.cust_ser_state + "','" + data.reamrk + "')";
		
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



	// 查询商品
	get: function(_collection, obj, callback) {
		// 一定要这步，要先连接sql
		openSql();

		connection.connect();
		var data = toString(obj)
			// console.log(obj)

		var userGetSql = 'SELECT * FROM ' + _collection;
		connection.query(userGetSql, function(err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				return;
			}
			console.log(result);
			callback(result);
		});
		connection.end();
	},

	// 增加商品
	add: function(_collection, data, callback) {
		openSql();
		connection.connect();

		console.log(data)
		var userAddSql = 'INSERT INTO ' + _collection + '(indexid,barcode,goodsname,goodstype,goodscount,units，supplier,purchasingprice,sellingprice) VALUES(0,?,?,?,?,?,?,?,?)';
		var userAddSql_Params = [data.barcode, data.goodsname, data.goodstype, data.goodscount, data.units, data.supplier, data.purchasingprice, data.sellingprice];

		connection.query(userAddSql, userAddSql_Params, function(err, result) {
			if (err) {
				console.log('[INSERT ERROR] - ', err.message);
				return;
			}
			console.log('插入成功')
			callback(true)
		})
		connection.end();
	},

	// 删除商品

	del: function(_collection, data, callback) {
		openSql();
		connection.connect();

		console.log(data.barcode)
		var userAddSql = 'DELETE FROM ' + _collection + ' WHERE barcode = ' + data.barcode;
		// var  userAddSql_Params = [222, 25];

		connection.query(userAddSql, function(err, result) {
			if (err) {
				console.log('[DELETE ERROR] - ', err.message);
				return;
			}

			console.log('删除成功')
			callback(true)
		})
		connection.end();
	},

	// 按条形码查询商品
	search: function(_collection, data, callback) {
		openSql();
		connection.connect();
		var userGetSql = 'SELECT * FROM ' + _collection + ' WHERE barcode=' + data.barcode;
		connection.query(userGetSql, function(err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				return;
			}
			console.log(result);
			callback(result);
		});
		connection.end();
	},

	// 会员添加
	addMember: function(_collection, data,callback){
			openSql();
			connection.connect();
			// console.log(data.supplierName)
								
			var userGetSql =  "SELECT * from members where memberTel = '"  +data.memberTel+ "'" ;
			connection.query(userGetSql, function(err,rows, res) {
				// console.log(rows)
				if (err) {
					console.log('[SELECT ERROR] - ', err.message);
					return false;
				}
				// console.log(rows[0]+'llllllll')
				if(!rows[0]){
					var  userAddSql = 'INSERT INTO '+_collection+' (cardNum,memberName,memberTel,memberPsw,memberCredits,memberEmail,memberAddress) VALUES(?,?,?,?,?,?,?)';
					var  userAddSql_Params = [ data.cardNum,data.memberName,data.memberTel,data.memberPsw,data.memberCredits,data.memberEmail,data.memberAddress,];
					console.log(userAddSql,userAddSql_Params)
					connection.query(userAddSql,userAddSql_Params,function(err,result){
					if(err){
						console.log('[INSERT ERROR] - ',err.message);
						return;
					}       
						console.log('插入成功')
						callback(true)
					})
				}else{
					callback(false)
				}
				connection.end();
			});

		},



	// 获取会员信息
	fecthMember: function(_collection, data, callback) {
	// 一定要这步，要先连接sql
		openSql();

		connection.connect();
		console.log(data)
		if(data.memberTel){
			var  userGetSql = 'SELECT * FROM ' + _collection + ' where memberTel = "' + data.memberTel+'"';
		} 
		if(data.memberName){
			var  userGetSql = 'SELECT * FROM ' + _collection + ' where memberName = "' + data.memberName+'"';
		}if(data.all){
			var  userGetSql = 'SELECT * FROM ' + _collection;
		}
		connection.query(userGetSql, function(err, result) {

			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				return;
			}
			console.log(result);
			callback(result);
		});
		connection.end();
	},

	//修改会员信息; 
	modifyMember:function(_collection,data,callback){
		openSql();
		connection.connect();
		var userAddSql= 'UPDATE ' + _collection + 'SET'
		connection.end();
	},

	// 修改商品信息
	modify: function(_collection, data, callback) {
		openSql();
		connection.connect();

		var userAddSql = 'UPDATE ' + _collection + ' SET barcode=?, goodsname=?, goodstype=?, goodscount=?, units=?, supplier=?, purchasingprice=?, sellingprice=? WHERE barcode=?';
		var userAddSql_Params = [data.barcode, data.goodsname, data.goodstype, data.goodscount, data.units, data.supplier, data.purchasingprice, data.sellingprice, data.barcode];

		connection.query(userAddSql, userAddSql_Params, function(err, result) {
			if (err) {
				console.log('[UPDATE ERROR] - ', err.message);
				return;
			}

			console.log('修改成功')
			callback(true)
		})
		connection.end();
	},


	// 修改会员
modifyMember: function(_collection, data, callback) {
		openSql();
		connection.connect();

		var userAddSql = 'UPDATE ' + _collection + ' SET cardNum=?, memberName=?, memberTel=?, memberPsw=?, memberCredits=?, memberEmail=?, memberAddress=? WHERE cardNum=?';
		var userAddSql_Params = [data.cardNum, data.memberName, data.memberTel, data.memberPsw, data.memberCredits,data.memberEmail, data.memberAddress ,data.cardNum];

		connection.query(userAddSql, userAddSql_Params, function(err, result) {
			if (err) {
				console.log('[UPDATE ERROR] - ', err.message);
				return;
			}

			// console.log('修改成功')
			callback(true)
		})
		connection.end();
	},
	// 删除会员
		delMember: function(_collection, data, callback) {
			openSql();
			connection.connect();

			console.log(data.barcode)
			var userAddSql = 'DELETE FROM ' + _collection + ' WHERE  cardNum = ' + data.cardNum;
			// var  userAddSql_Params = [222, 25];

			connection.query(userAddSql, function(err, result) {
				if (err) {
					console.log('[DELETE ERROR] - ', err.message);
					return;
				}

				console.log('删除成功')
				callback(true)
			})
			connection.end();
	},

}