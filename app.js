var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');
var _ = require('underscore');
var utils = require('./server/utils.js');


//use express session and then pass it into the MongoDBstore to handle sessions properly
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var mongoose    = require('mongoose');

//oAuth
var passport = require('passport');


var routes = require('./routes/index');

var app = express();

mongoose.connect('mongodb://localhost/yopo'); // connect to mongo database 

//establishes a Session store with MongoDB, this creates persistant sessions that will
//not cause a memory leak and will persist even when resetting the page or server
var store = new MongoDBStore({
  uri: 'mongodb://localhost/yopoApp',
  collection: 'mySessions'
});
// error handling for session store
store.on('error', function(error) {
  console.log('ERROR IN STORE: ', error);
});

// pass passport for authentication configuration
require('./server/config/passport.js')(passport);


// view engine setup
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/', express.static(path.join(__dirname, 'public')));


//passport Oauth session configuration
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    //these cookies will last one week
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store: store
}));

// Initializes Passport
app.use(passport.initialize());
app.use(passport.session());

//serves up front-end files and instantiates router
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes(passport));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
