// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var User = require('../models/user');

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// passport.use({usernameField: 'emailAddress'}, new LocalStrategy(function(username, password, done) {
//   User.findOne({ emailAddress: username }, function(err, user) {
//     if(err){
//         return done(err);
//     }
//     if (!user) {
//         return done(null, false, { message: 'Email ' + username + ' not found'});
//     }
//     else{
//         //check if password matches and pass parameters in done accordingly
//          }
//      });
// }));
// Passport JWT stuff


var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var passport = require('passport');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.dragonscancode.com';
opts.audience = 'localhost'; // dragonscancode.com maybe?
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	User.findOne({id: jwt_payload.sub}, function(err, user) {
		if(err) {
			return done(err, false);
		}
		if(user) {
			return done(null, user);
		}
		else {
			return done(null, false);
			// or you could create a new account
		}
	})
}));