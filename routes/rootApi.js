const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

const nano = require("nano")(process.env.DB_URL);

const accountManager = require("../accountManagement.js");

router.post("/login", checkNotAuthenticated, (req, res) => {
	passport.authenticate("local", { session: false }, (err, user) => {
		console.log("logging in");
		if (err || !user) {
			console.log(err);
			return res.status(400).json({
				error: "bad_username_or_password",
				message:
					"The matching username and password could not be found",
			});
		}

		req.login(user, { session: false }, (err) => {
			if (err) {
				res.send(err);
			}

			if (!user.clans || !user.clans.length) {
				return res.status(400).json({
					message:
						"No clans, user might not have been initiated correctly",
					user: user._id,
				});
			}

			// generate a signed son web token with the contents of user object and return it in the response
			const token = jwt.sign(user, process.env.SESSION_SECRET);
			return res.json({
				user: {
					id: user._id,
					name: user.name,
					clans: user.clans,
					activeClan: user.clans[0],
					roles: [],
				},
				token,
			});
		});
	})(req, res);
});

router.post("/register", async (req, res) => {
	accountManager
		.createNewUserAccount(req.body.email, req.body.name, req.body.password)
		.then(() => {
			console.log("Registration successful");

			res.send("registration successful");
		})
		.catch((error) => {
			console.log(error);
			res.status(400).json({
				message: "Account with this email already exists.",
			});
		});
});

router.delete("/logout", (req, res) => {
	req.logOut();
	res.redirect("/login");
});

router.get("/activateAccount", (req, res) => {
	console.log("Activating key: " + req.query.key);

	accountManager
		.activateUserAccount(req.query.key)
		.then(() => {
			console.log("activation successful");
			res.send({ message: "activation successful" });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send(error);
		});
});

// Authentication required
router.get("/userdata", (req, res, next) => {
	console.log("time to auth");

	passport.authenticate("jwt", { session: false }, (err, user, info) => {
		console.log("authing");
		if (err || !user) {
			return res.status(400).json({
				message: "Something is not right",
				user: user,
			});
		}

		return res.send("user data");
	})(req, res);
});

function checkAuthenticated(request, response, next) {
	if (request.isAuthenticated()) {
		return next();
	}

	response.redirect("/login");
}

function checkNotAuthenticated(request, response, next) {
	console.log(request.body);
	if (request.isAuthenticated()) {
		return response.redirect("/");
	}

	return next();
}

module.exports = router;
