function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); 
  return null; 
}
let ws = new WebSocket("ws://"+location.hostname+":3300/list",[user=getQueryString('user_code')]);   
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
    if(tst[i].user_state == 2){
      hml += "<li><span>"+tst[i].user_name+"</span><span>(在线)</span><a href='/index?to="+tst[i].user_code+"&user_code="+getQueryString('user_code')+"'>在线咨询</a></li>"
    }else if(tst[i].user_state == 1){
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

function send() {  
  var ii = document.getElementById("message").value;
  var ww = document.getElementById("name").value;
  var we = {
    qq : ii,
    id : ww,
    user : 'cao----dan',
    tou : 'wu----yu'
  }
  var nm = JSON.stringify(we)
  console.log("发送", nm);  
  ws.send(nm);  
};  

function exit() {  
  var r = ws.close();  
  console.log("退出", r);  
}  