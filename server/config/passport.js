var User = require('./models/userModel.js');
var Q = require('q');
var GitHubStrategy = require('passport-github').Strategy;


var GITHUB_CLIENT_ID = "d5eae655b197b1902c35"
var GITHUB_CLIENT_SECRET = "bb195fc5b2777a5bd78429ab30e9210abca74997";

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(username, done) {
    var findUser = Q.nbind(User.findOne, User);

    findUser({username: username})
      .then(function(user){
        if(!user) {
          console.log("user does not exist to deserialize");
        }else{
          console.log("user found", user)
        }
        done(null, user);
      });
  });


  // Use the GitHubStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and GitHub
  //   profile), and invoke a callback with a user object.
  passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      var username = profile.username
      var findUser = Q.nbind(User.findOne, User);

      findUser({username: username})
        .then(function(user){
          if(!user) {
            console.log("User does not exist");
          }else{
            console.log("user found", user)
            return done(null, user);
          }
        });
      
    }
  ));
}