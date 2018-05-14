var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let session = require('express-session')
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

app.use(session({
  secret: 'recall',
  name: 'testapp',
  cookie: {
      maxAge: 80000
  },
  resave: false,
  saveUninitialized: true
}));

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
}]
wss.on('connection', function (ws,ww) {
  ws.on('message', function (message) {
    console.log(message)
    let data = JSON.parse(message)
    wss.clients.forEach(function each(client) {
      if(client.protocol==data.tou){
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
