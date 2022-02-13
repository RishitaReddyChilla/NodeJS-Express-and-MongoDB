var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');


const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db)=>{
  console.log('Connected Correctly to server');
},(err)=>{console.log(err);});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
//app.use(cookieParser('12345-67890-09876-54321'));
/*//sessions
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));
*/
//app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*//authetication
//All the middleware after this point should undergo authorization
//while authenticating - the first part of every encoded string wil be "Basic" and space " " followed by "username:password"
    //EG: Basic username:password
    //Here we are splitting Basic from the username and password string and extracting second [1] that is concatenated username and password
    //then again splitting the username and password which are separated by ":"
    //so, auth will be an array containing username and password
    function auth (req, res, next) {
      console.log(req.user);
  
      if (!req.user) {
        var err = new Error('You are not authenticated!');
        err.status = 403;
        next(err);
      }
      else {
            next();
      }
  }
app.use(auth);
*/

app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

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
