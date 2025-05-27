var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var webhook1 = require('./routes/webhook-1');
var webhook2 = require('./routes/webhook-2');
var webhook3 = require('./routes/webhook-3');
var webhook4 = require('./routes/webhook-4');
var usersRouter = require('./routes/users');
var plmmRouter = require('./routes/plmm');
var testRouter = require('./routes/test');
var {every_day} = require('./utils/every_day')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/webhook-1', webhook1);
app.use('/webhook-2', webhook2);
app.use('/webhook-3', webhook3);
app.use('/webhook-4', webhook4);
app.use('/', usersRouter);
app.use('/users', usersRouter);
app.use('/mm', plmmRouter);
app.use('/test', testRouter);

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

every_day();

module.exports = app;
