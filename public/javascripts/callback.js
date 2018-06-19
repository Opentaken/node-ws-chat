function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); 
  return null; 
}
var ws = new WebSocket("ws://127.0.0.1:3300/login",[user=getQueryString('user_code')]);
ws.onopen = function() {  
  console.log("连接状态", ws);  
  console.log("open");  
  // ws.open("start");  
}; 
ws.onmessage = function(evt) {
console.log(evt.data)
let tst = JSON.parse(evt.data);
let hml = '';
for(i=0;i<tst.length;i++){
  if(tst[i].status == 1){
    hml += "<li><span>"+tst[i].user_name+"</span><span>(在线)</span><a href='/index?touser="+tst[i].user_code+"'>在线咨询</a></li>"
  }else{
    hml += "<li><span>"+tst[i].user_name+"</span><span>(离线)</span><a href='javascript:void(0)'>不可咨询</a></li>"
  }
}
$("#kf_list").html(hml)
};  
ws.onclose = function(evt) {  
console.log("WebSocketClosed!");  
console.log(evt);
};  
ws.onerror = function(evt) {  
console.log("WebSocketError!");  
}; 