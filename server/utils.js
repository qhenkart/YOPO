var fs = require('fs');



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


// exports.isRegistered = function(req, res, next){

// }


exports.addData = function(req, res, storage, callback){
  fs.writeFile("./server/storage/storage", JSON.stringify(storage), function(err){
    if(err){
      return console.log(err, "error on adddata");
    }
    callback();
  });

}

exports.checkData = function(req, res, storage, cb){
  var user = (req.user.displayName).replace(" ", "-");
  if(storage.users[user] !== undefined && storage.users[user].login === req.user.username  && storage.users[user].organization !== null){
    cb()
  }else{
    storage.users[user] = {login: req.user.username, name: req.user.displayName, organization: null, team: null,exclusions: [req.user.displayName], inclusions:[]};
    exports.addData(req, res, storage, function(){
      res.render('signup', {data: storage.users[user]});
      // req.session.destroy(function(){
      // });
    })
  }
}




//========