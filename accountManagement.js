const uuid4 = require("uuid");
const bcrypt = require("bcrypt");
const nano = require("nano")(process.env.DB_URL);
const usersDb = nano.db.use("plains_users");
const Mailer = require("./mailer");
const ClanManager = require("./clanManagement.js");

class UserAccount {
	constructor(email, name, password) {
		this.name = name;
		this.email = email;
		this.password = password;

		this.clans = [];
		this.activeClan = "";
		this.activated = false;
		this.activationCode = "";
		this.disabled = false;
	}
}

// Account management functionality
class AccountManager {
	constructor() {}

	static async createNewUserAccount(email, username, password) {
		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user
		const newUser = new UserAccount(email, username, password);

		// Create activation code
		newUser.activationCode = uuid4.v4();

		await usersDb
			.insert(newUser, hashedPassword)
			.catch((error) => Promise.reject(new Error(error)));

		Mailer.sendActivationEmail(email, newUser.activationCode);
	}

	static async activateUserAccount(key) {
		// Get the user from the key
		let result = await usersDb.view("users", "awaitingActivation", {
			include_docs: true,
			keys: [key],
		});

		if (!result.rows.length) {
			return Promise.reject(new Error("Activation code not found"));
		}

		let user = result.rows[0].doc;

		// Check to see if the user is already activated
		if (user.activated) {
			return Promise.reject(new Error("User already Activated"));
		}

		// Compare activation codes
		if (user.activationCode !== key) {
			return Promise.reject(new Error("Activation codes do not match"));
		}

		// TODO: check to see if the activation has expired

		// Activate user
		user.activated = true;
		user.activationCode = "";

		// Create clan information
		result = await ClanManager.createNewClan();

		// Update user data
		user.clans.push(result.clanId);
		user.activeClan = result.clanId;
		usersDb.insert(user);
	}

	static resetPassword(email) {}

	static logUserIn(email) {}
}

module.exports = AccountManager;
