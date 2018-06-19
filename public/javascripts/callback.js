function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); 
  return null; 
}
var ws = new WebSocket("ws://"+location.hostname+":3300/login",[user=getQueryString('user_code')]);
ws.onopen = function() {  
  console.log("连接状态", ws);  
  console.log("open");  
  // ws.open("start");  
}; 
window.location = 'chat?user_code='+getQueryString('user_code')