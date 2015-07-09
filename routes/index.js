var express = require('express');
var router = express.Router();
var utils = require('../server/utils.js')



module.exports = function(passport){
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }    
    res.render('login')
  } 

/* GET home page. */
  router.get('/',ensureAuthenticated, function(req, res, next) {

    res.render('success', { title: 'Express' });
  });

  router.get('/getPartner', ensureAuthenticated, function(req, res){
    utils.checkCohort(req, res, function(cohort){
      res.json(cohort);
    });
  })

  router.get('/auth/github', passport.authenticate('github'), function(req, res){});

  // GET /auth/github/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
      console.log("received")
      res.redirect('/');
      
    });
  return router;
};
