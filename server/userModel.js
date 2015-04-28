var mysql = require('mysql');
var Sequelize = require("sequelize");



var sequelize = new Sequelize("yopo", "root", "");

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  organization: Sequalize.STRING,
  team: Sequalize.STRING
});

var Teammates = sequalize.define("Teammates", {
  username: Sequalize.STRING,
});

User.hasMany(Teammates);

User.sync();
Teammates.sync();

exports.User = User;
exports.Teammates = Teammates;