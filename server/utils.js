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
  if(storage.users[req.user.username] !== undefined && storage.users[req.user.username].organization !== null){
    cb()
  }else{
    storage.users[req.user.username] = {login: req.user.username, name: req.user.displayName, organization: null, team: null};
    exports.addData(req, res, storage, function(){
      req.session.destroy(function(){
        res.render('signup', {data: storage.users[req.user.username]});
      });
    })
  }
}




//========