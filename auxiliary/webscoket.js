let WebSocket = require('ws');
const mysql = require('./mySql')
// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
    port: 3300
});

mysql.userList('chat_user',function(data){
  //客服列表逻辑
  let user = data;//客服信息
  let record = {};//聊天记录
  for(i in user){
    console.log(user[i].user_code)
    record = {
      [user[i].user_code] : []
    }
    console.log(record);
  }
  console.log(record);
  console.log(Object.keys(record))
  let list_use = [];//记录停留在客服列表页面的用户
  function listClient(ww){
    let headers = ww.headers;
    if(ww.url == '/list'){//客服列表
      let client_user = headers['sec-websocket-protocol'];//获取连接服务的usercode
      wss.clients.forEach(function each(client) {//将客服信息返回给停留于客服列表页面的用户
        if(client.protocol==client_user){
          client.send(JSON.stringify(user));
        }
      });
      if(list_use.indexOf(client_user)<0){//判断该用户是否已经记录在列表页面痕迹，如果不存在则记录
        list_use.push(client_user)
      };
    }else if(ww.url == '/login'){//客服登陆之后更新客服列表并返回给停留在客服列表页面的用户
      for(i of user){
        i.user_code == headers['sec-websocket-protocol'] ? i.user_state = 2 : '' //i.user_state = 2 表示该客服状态代表在线
      }
      wss.clients.forEach(function each(client) {//将更新后的客服信息返回给停留于客服列表页面的用户
        for(i in list_use){
          if(client.protocol==list_use[i]){
            client.send(JSON.stringify(user));
          }
        }
      });
    }else{//进入的页面非客服列表则判断当前用户是否在客服列表停留过，停留过则更新痕迹（当前痕迹只有记录客户列表页面，非客服列表页面删除列表页面痕迹）
      if(list_use.indexOf(headers['sec-websocket-protocol'])>-1){
        list_use.splice(list_use.findIndex(item => item === headers['sec-websocket-protocol']), 1)
      }
    }
  }

  //对话逻辑
  wss.on('connection', function (ws,ww) {
    listClient(ww);
    console.log("-----连接-----")
    ws.on('message', function (message) {
      let data = JSON.parse(message)
      wss.clients.forEach(function each(client) {
        if(client.protocol==data.to){
          client.send(message);
        }
      });
    })
    ws.on('close', function(q) {
      console.log("-----关闭-----")
    })

  });
})
