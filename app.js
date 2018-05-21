var createError = require('http-errors');
var express = require('express');
var path = require('path');
let config = require('./config.js')
var cookieParser = require('cookie-parser');
let session = require('express-session');
let redisStore = require('connect-redis')(session);
let bodyParser = require('body-parser');
var logger = require('morgan');
var http = require('http');
let WebSocket = require('./auxiliary/webscoket'); //webscoket逻辑文件

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
if (true) {
  //使用session
  app.use(session({
    secret: config.sessionConfig.secret,
    name: config.sessionConfig.name,
    cookie: {
        maxAge: config.sessionConfig.maxAge
    },
    resave: false,
    saveUninitialized: true
  }));
} else {
  // 使用redis
  app.use(session({
      store: new redisStore({
          host: config.redisConfig.host,
          port: config.redisConfig.port,
          db: config.redisConfig.db
      }),
      cookie: {
          maxAge: config.sessionConfig.maxAge
      },
      name: config.sessionConfig.name,
      secret: config.sessionConfig.secret,
      resave: false,
      saveUninitialized: true
  }));
}

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
