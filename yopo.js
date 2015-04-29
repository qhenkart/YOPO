var express = require('express');
var partials = require('express-partials');
var passport = require('passport');
var util = require('util');
var fs = require('fs');
var _ = require('underscore');


var utils = require('./server/utils.js')
var GitHubStrategy = require('passport-github').Strategy;

var utils = require('./server/utils.js');
var bodyParser = require('body-parser');
var session = require('express-session');

var db = require('./server/userModel.js');

// var mongoose = require('mongoose')


var app = express();

app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
//====
var GITHUB_CLIENT_ID = "d5eae655b197b1902c35"
var GITHUB_CLIENT_SECRET = "bb195fc5b2777a5bd78429ab30e9210abca74997";

//===personal database set up
var storage;
fs.readFile('./server/storage/storage', 'utf8', function (err,data) {
  if (err) {
    return console.log(err, "error on intialize");
  }
  if(data.length){
    storage = JSON.parse(data);
  }else{
    storage = {users:{}};

  }
});
//==============

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
console.log(__dirname)

//default page
app.get('/', utils.ensureAuthenticated,function(req, res) {
  var username = req.session.passport.user.displayName;
  username = username.replace(" ", "-");
  res.render('index', {data: JSON.stringify(storage.users[username])});
});

app.get('/signup', function(req, res){
  // res.render('signup');
});

app.get('/login',function(req, res) {
  res.render('login');
});

app.get('/logout', function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
});

app.get('/getPartner', function(req, res){
  var username = req.session.passport.user.displayName;
  username = username.replace(" ", "-");
  var bucket = storage.users[username]
  console.log("sending data", storage[bucket.organization][bucket.team])

  res.status(200).send(JSON.stringify({exclusions:bucket.exclusions,team:storage[bucket.organization][bucket.team]}));
})

app.post("/updateExclusions", function(req, res){
  var username = req.session.passport.user.displayName;
  username = username.replace(" ", "-");

  var bucket = storage.users[username];
  console.log(req.body.selection)
  if(req.body.selection !== undefined){

    bucket.exclusions.push(req.body.selection);
    utils.addData(req,res,storage,function(){
      console.log(req.body, "message recieved")
      
    })
  }

});

app.post('/sendInclusions', function(req, res){
  var username = req.session.passport.user.displayName;
  username = username.replace(" ", "-");

  var bucket = storage.users[username];
  bucket.inclusions = req.body;
});

// app.get('/getInclusions', function(req, res){
//   var username = req.session.passport.user.displayName;
//   username = username.replace(" ", "-");

//   var bucket = storage.users[username];
//   var match=[];
//   _.each(bucket.inclusions, function(person){
    
//     if(storage.users[person].inclusions.indexOf(username) !== 1){
//       match.push(person);
//     }
//   });
//   res.status(200).send(JSON.stringify(match[0]))
// })


app.post('/signup', function(req, res){
  var username = req.session.passport.user.displayName;
  username = username.replace(" ", "-");
  var organization = req.body.organization;
  var team = req.body.team;
  organization = organization.replace(/ |-|_|<|>/g, "").toLowerCase()
  team = team.replace(/ |-|_|<|>/g, "").toLowerCase();
  storage.users[username].organization = organization;
  storage.users[username].team = team;

  if(storage[organization] !== undefined && storage[organization][team] === undefined){
    storage[organization] = [storage[username].name]
  }else if(storage[organization] === undefined){
    storage[organization] = {};
    storage[organization][team] = [storage.users[username].name]
  }else if(storage[organization][team]){
    storage[organization][team].push(storage.users[username].name)
  }
  utils.addData(req,res,storage,function(){

    res.redirect('/');
  });




  // res.redirect('/auth/github')

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
    utils.checkData(req, res, storage, function(){
      res.redirect('/');
    })
    // console.log(req.user.login)
  });
//========

console.log('YOPO is listening on 4568');
app.listen(4568);

