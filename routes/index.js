var express = require('express');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get("/login", passport.authenticate("passport-jwt"), function(req, res) {
// 	// Success
// 	// req.user contains the authenticated user

// 	res.redirect("/users/" + req.user.username);
// });

module.exports = router;
