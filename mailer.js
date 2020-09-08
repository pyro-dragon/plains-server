const nodemailer = require("nodemailer");

class Mailer {
	constructor() {}

	static async _createTransport() {
		let testAccount = await nodemailer.createTestAccount();

		return nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: testAccount.user, // generated ethereal user
				pass: testAccount.pass, // generated ethereal password
			},
		});
	}

	static async test() {
		let testAccount = await nodemailer.createTestAccount();

		let transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: testAccount.user, // generated ethereal user
				pass: testAccount.pass, // generated ethereal password
			},
		});

		let info = await transporter.sendMail({
			from: '"Auto" <Plains@dragonscancode.com>', // sender address
			to: "rpettefar@dragonscancode.com", // list of receivers
			subject: "Hello ✔", // Subject line
			text: "Hello world?", // plain text body
			html: "<b>Hello world?</b>", // html body
		});

		console.log("Message sent: %s", info.messageId);

		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	}

	static async sendActivationEmail(email, activationKey) {
		let transport = await this._createTransport();

		let info = await transport.sendMail({
			from: '"Plains" <noreply@dragonscancode.com>', // sender address
			to: email, // list of receivers
			subject: "Account Activation", // Subject line
			// text: "Hello world?", // plain text body
			html:
				"<h3>Welcome to Plains!</h3><p>Activate your account <a href='http://localhost:4200/activateAccount?key=" +
				activationKey +
				"'>here</a></p>", // html body
		});

		console.log("Message sent: %s", info.messageId);

		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	}

	static async sendPasswordResetEmail(email, resetKey) {
		let transport = await this._createTransport();

		let info = await transport.sendMail({
			from: '"Plains" <noreply@dragonscancode.com>', // sender address
			to: email, // list of receivers
			subject: "Password reset", // Subject line
			// text: "Hello world?", // plain text body
			html:
				"<h3>Password reset request</h3><p>A password reset request has been made to this account. Please click the following link to reset your password. </p><p><a href='http://localhost:4200/concludePasswordReset?key=" +
				resetKey +
				"'>here</a></p>", // html body
		});

		console.log("Message sent: %s", info.messageId);

		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	}
}

module.exports = Mailer;
