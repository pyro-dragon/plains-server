// import nano from 'nano';
const nano = require("nano")("http://127.0.0.1:5984");

class DatabaseLayer {

	constructor() {
		this.userDatabase = nano.use("plains_users");
	}

	authenticateUser(username, password) {
		return this.userDatabase.get("c68a373f09a27f6dd43ca9104f01e3b8").then(function(body){
			console.log(body);
			res.send('body: ' + body);
		}, function(error){
			console.error(error);
			res.error('error: ' + error);
		});
	}
}

module.exports = new DatabaseLayer();
