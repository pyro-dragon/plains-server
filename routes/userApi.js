const express = require("express");
const router = express.Router();
const uuid4 = require("uuid");
const bcrypt = require("bcrypt");

const nano = require("nano")(process.env.DB_URL);
const usersDb = nano.db.use("plains_users");
const Mailer = require("../mailer");

router.post("/resetPassword", async (req, res, next) => {
	console.log("/user/resetPassword: " + req.body.email);

	// Check if the request has an email address
	if (!req.body && !req.body.email) {
		res.status(500).send("No email supplied with request.");
	}

	// Check if the user exists
	const user = await usersDb.get(req.body.email).catch((error) => {
		res.send();
		return;
	});
	console.log(user);

	// Create a reset code
	user.activationCode = uuid4.v4();

	// Update the user account
	await usersDb.insert(user).catch((error) => res.error(error));

	// Email the reset code
	Mailer.sendPasswordResetEmail(req.body.email, user.activationCode);

	// Send a response to conclude the request
	res.send();
});

router.post("/newPassword", async (req, res, next) => {
	console.log("/user/newPassword: " + req.body.key + ":" + req.body.password);

	// Check if the request has a key and password
	if (!req.body && !req.body.key && !req.body.password) {
		res.send();
	}
	console.log(1);
	// Get the user from the key
	let result = await usersDb.view("users", "awaitingActivation", {
		include_docs: true,
		keys: [req.body.key],
	});

	console.log(2);
	if (!result.rows || !result.rows.length) {
		res.status(500).send("Error");
		return;
	}

	console.log(3);
	// Hash and set the new password
	const user = result.rows[0].doc;
	user.password = await bcrypt.hash(req.body.password, 10);

	// Remove the activation code
	user.activationCode = "";
	console.log(4);

	// Update the user account
	await usersDb
		.insert(user)
		.then(res.send("Password change successful!"))
		.catch((error) => res.error(error));
	console.log(5);

	// Send a response to conclude the request
	res.send();
});

module.exports = router;
