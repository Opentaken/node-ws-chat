var name;
$.ajax({
  url:'/users/login/get',
  type:'GET', 
  async:false,
  timeout:5000,    //超时时间
  dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
   data:{
    // name:'yang',age:25
  },
  success:function(data,textStatus,jqXHR){
      console.log(data)
      name=data.userName;
      // console.log(textStatus);
      // console.log(jqXHR);
  },
  error:function(xhr,textStatus){
      console.log('错误')
      console.log(xhr)
      console.log(textStatus)
  },
});

var ws = new WebSocket("ws://192.168.1.112:3300",[user=name]); 
var chatWindow=document.getElementById('chatWindow');
var myMessage=document.getElementById("message");
var serverName="liuyun";//默认客服
ws.onopen = function() {  
  console.log("连接状态", ws);  
  console.log("open");  
  // ws.open("start");  
};  
ws.onmessage = function(evt) {
  console.log(evt);
  console.log('---');
  // console.log(evt.data.message);
  // console.log(JSON.parse(message);
  let data=JSON.parse(evt.data);
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
  var message = myMessage.value;
  if(!message){
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
  serverName=name;
  console.log(serverName);
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