var mongoose = require('mongoose');
var Q = require('q')


var UserSchema = new mongoose.Schema({
  name:  String,
  username: String,
  email: String,
  cohort: Number,
  inclusions: [],
  exclusions: []  
});



module.exports = mongoose.model('users', UserSchema);

