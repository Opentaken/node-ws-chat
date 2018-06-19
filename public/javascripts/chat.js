function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); 
  return null; 
}
var ws = new WebSocket("ws://"+location.hostname+":3300",[user=getQueryString('user_code')]); 

function fmtDate(){
  var date =  new Date();
  var y = 1900+date.getYear();
  var M = "0"+(date.getMonth()+1);
  var d = "0"+date.getDate();
  var h = "0"+date.getHours();
  var m = "0"+date.getMinutes();
  var s = "0"+date.getSeconds();
  return y+"-"+M.substring(M.length-2,M.length)+"-"+d.substring(d.length-2,d.length)+" "+h.substring(h.length-2,h.length)+":"+m.substring(m.length-2,m.length)+":"+s.substring(s.length-2,s.length);
}

ws.onopen = function() {  
  console.log("连接状态", ws);  
  console.log("open");
};  
ws.onmessage = function(evt) {
  console.log(evt.data)
  insert('receive',JSON.parse(evt.data));
  toUser = JSON.parse(evt.data).user_code;
  console.log(toUser)
};  
ws.onclose = function(evt) {  
  console.log("WebSocketClosed!");  
};  
ws.onerror = function(evt) {  
  console.log("WebSocketError!");  
};  
  
function send() {  
  let data = {
    to: toUser,
    user_code: getQueryString('user_code'),
    message: $("#message").val(),
    time: fmtDate()
  }
  ws.send(JSON.stringify(data));
  insert('send',data);
};  

function insert(type,data) {
  let content = $("#chatWindow").html();
  if(type == 'send'){
    content += "<li class='right'><p><strong>"+data.user_code+"</strong>"+data.time+"</p><p>"+data.message+"</p></li>"
  }else if(type == 'receive'){
    content += "<li class='left'><p><strong>"+data.to+"</strong>"+data.time+"</p><p>"+data.message+"</p></li>"
  }
  $("#chatWindow").html(content);
}
