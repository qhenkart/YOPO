var express = require('express');
var partials = require('express-partials');
var passport = require('passport');
var util = require('util');
var GitHubStrategy = require('passport-github').Strategy;
var utils = require('./app/utils.js');
var bodyParser = require('body-parser');
var session = require('express-session');


var app = express();
//====
var GITHUB_CLIENT_ID = "d5eae655b197b1902c35"
var GITHUB_CLIENT_SECRET = "bb195fc5b2777a5bd78429ab30e9210abca74997";




// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
//==============
//====



// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:4568/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));
//==============
//==============
app.use(session({
    secret: "itsonlyasecret",
    resave: false,
    saveUninitialized: true
}));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
//=============

//sets where the ejs views are
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(partials());
//=======

//===== servers up backbone framework
app.use(express.static(__dirname + '/public'));


//default page
app.get('/', utils.ensureAuthenticated,function(req, res) {
  res.render('index');
});

app.get('/login',function(req, res) {
  res.render('login');
});

app.get('/logout', function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
});


//=======Github Auth

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHubwill redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
//========

console.log('YOPO is listening on 4568');
app.listen(4568);

