let WebSocket = require('ws');
// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
    port: 3300
});

let user = [{
  "name": 'aa33a',
  "status": 0
},{
  "name": 'bbb',
  "status": 0
},{
  "name": 'ccc',
  "status": 0
}]
let list_use = [];
function listClient(ww){
  let headers = ww.headers;
  if(ww.url == '/list'){
    for( i in headers){
      if(i=='sec-websocket-protocol'){
        wss.clients.forEach(function each(client) {
          if(client.protocol==headers[i]){
            client.send(JSON.stringify(user));
          }
        });
        if(list_use.indexOf(headers[i])<0){
          list_use.push(headers[i])
        };
      }
    };
  }else{
    for( i in headers){
      if(i=='sec-websocket-protocol'){
        if(list_use.indexOf(headers[i])>-1){
          list_use.splice(list_use.findIndex(item => item === headers[i]), 1)
        }
      }
    }
  }
}


wss.on('connection', function (ws,ww) {
  listClient(ww);
  ws.on('message', function (message) {
    console.log(message)
    let data = JSON.parse(message)
    wss.clients.forEach(function each(client) {
      if(client.protocol==data.to){
        client.send(message);
      }
    });
  })

});