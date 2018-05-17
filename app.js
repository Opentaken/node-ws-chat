var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let session = require('express-session');
let redisStore = require('connect-redis')(session);
let bodyParser = require('body-parser');
var logger = require('morgan');
var http = require('http');
var WebSocket = require('ws');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 定义数据解析器
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//session和redis
if (ture) {
  //使用session
  app.use(session({
    secret: 'recall',
    name: 'testapp',
    cookie: {
        maxAge: 80000
    },
    resave: false,
    saveUninitialized: true
  }));
} else {
  // 使用redis
  app.use(session({
      store: new redisStore({
          host: '127.0.0.1',
          port: '6379',
          db: 2
      }),
      cookie: {
          maxAge: 80000
      },
      name: 'testapp',
      secret: 'recall',
      resave: false,
      saveUninitialized: true
  }));
}

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
    port: 3300
});

let user = [{
  "name": 'aaa',
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





app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
