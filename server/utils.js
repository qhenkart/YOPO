
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