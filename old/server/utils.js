var fs = require('fs');
var User = require('./models/userModel.js')
var Q = require('q')
var _ = require('underscore')



exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}


// exports.getOrganization = function(req, res){
// var request = require('request');
//   request.get('https://api.github.com', function(err, response, body) {
//     if (!err && response.statusCode == 200) {
//       var locals = JSON.parse(body);
//       console.log(body)
//       // res.render('<YOUR TEMPLATE>', locals);
//     }else{
//       console.log(err);
//     }
//   });
  
// }


//populates the database with a JSON file from the bookstrap page
exports.addData = function(req, res, storage, callback){
  var counter = 0;
  fs.readFile('./server/storage/cohort', 'utf8', function (err, data) {
    if (err) {
      return console.log(err, "error on intialize");
    }else{
      var cohort = JSON.parse(data)
      console.log(cohort)
      _.each(cohort, function(user){
        var newUser = new User({
          username: user.username, 
          name: user.name,
          email: user.email,
          cohort: user.cohort,
          exclusions: [user.username]
        });

        newUser.save(function(err, result){
          if(err){
            console.log(err, 'error!');
          }else{
            counter++;
            console.log(result, 'success!!');
          }
        });
      })
    }
  });
}

exports.checkData = function(req, res, cb){
  var username = req.user.username
  var findUser = Q.nbind(User.findOne, User);
  // exports.addData()

  findUser({username: username})
    .then(function(user){
      if(!user) {
        console.log("User does not exist");
      }else{
        console.log("user found", user)
        cb(user)
      }
    })
}

exports.checkCohort = function(req, res, cb){
  var username = req.user.username;
  var findUser = Q.nbind(User.findOne, User);
  var findCohort = Q.nbind(User.find, User);

  findUser({username: username})
    .then(function(user){
      if(!user) {
        console.log("User does not exist");
      }else{
        console.log("user found", user)
        findCohort({cohort: user.cohort})
          .then(function(cohort){
            if(!cohort) {
              console.log("Cohort does not exist");
            }else{
              console.log("Cohort found", cohort)

              cb(cohort)
            }
          })
      }
    });
}