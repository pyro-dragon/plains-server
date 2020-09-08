const LocalStratagy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

function initPassport(passport, getUserByEmail, getUserById) {
	const authenticateUser = async (email, password, done) => {
		getUserByEmail(email)
			.then((user) => {
				console.log(user);
				if (user == null) {
					return done(null, false, {
						message: "No user with that email",
					});
				}
				console.log("trying...");
				try {
					if (bcrypt.compare(password, user.password)) {
						return done(null, user);
					} else {
						return done(null, false, {
							message: "Password incorrect",
						});
					}
				} catch (e) {
					return done(e);
				}
			})
			.catch((error) => {
				console.log(error);
				return done("User does not exist");
			});
	};

	passport.use(
		new LocalStratagy(
			{
				usernameField: "email",
			},
			authenticateUser
		)
	);

	passport.use(
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
				secretOrKey: process.env.SESSION_SECRET,
			},
			function (jwtPayload, cb) {
				console.log(jwtPayload);

				return cb(null, jwtPayload.email);
				//find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
				// return UserModel.findOneById(jwtPayload.id)
				// 	.then(user => {
				// 		return cb(null, user);
				// 	})
				// 	.catch(err => {
				// 		return cb(err);
				// 	});
			}
		)
	);

	passport.serializeUser((user, done) => done(null, user.id));

	passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

function test() {
	console.log("test");
}

// module.exports = initalise;
export { test, initPassport };
