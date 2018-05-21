var name="liuyun"
var ws = new WebSocket("ws://192.168.1.112:3300",[user=name]); 
var chatWindow=document.getElementById('chatWindow');
var myMessage=document.getElementById("message");
var serverName;
ws.onopen = function() {  
    console.log("连接状态", ws);  
    console.log("open");
};  
ws.onmessage = function(evt) {
    console.log(evt);
    console.log('---');
    let data=JSON.parse(evt.data);
    serverName=data.user,
    addIntoWindow('costmon',data.user,data.message);
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
    if(!message){

      return
    }
    if(!serverName){
        alert('暂无访问人员加入')
      return
    }
    addIntoWindow('client',name,message)
    // console.log("发送", nm); 
    var totalMes = {
      to : serverName ,//客服人员
      message : message,
      user:name
    }
    ws.send(JSON.stringify(totalMes));  
    myMessage.value='';
};  
function changeTo(name){
    name=name;
    alert('更换客服角色成功');
};
function addIntoWindow(flag,user,message){
    var li=document.createElement('LI');
    var myName;
     if(flag=='client'){
       li.classList.add('right'); 
     }else if(flag=='costmon'){
       li.classList.add('left');
     }
     li.innerHTML=`<p>${user} ${getNow()}</p><p>${message}</p>`;

     chatWindow.appendChild(li);
};
function getNow(){
  let time=new Date();
  let year=time.getFullYear();
  let month=time.getMonth()+1;
  let day=time.getDate();
  let hour=time.getHours();
  let min=time.getMinutes();
  let sec=time.getSeconds();
  if(month<10){
    month="0"+month;
  }
  if(day<10){
    day="0"+day;
  }
  if(hour<10){
    hour="0"+hour;
  }
  if(min<10){
    min="0"+min;
  }
  if(sec<10){
    sec="0"+sec;
  }
  return `${year}-${month}-${day} ${hour}:${month}:${sec}`;
};
function exit() {  
    var r = ws.close();  
    console.log("退出", r);  
}  