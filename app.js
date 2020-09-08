const Game = require("./game/Game");

const dotenv = require("dotenv");
let env = {};
if (process.env.NODE_ENV !== "production") {
	env = dotenv.config();
}

const express = require("express");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const Mailer = require("./mailer");

const nano = require("nano");
const nanoInstance = nano(process.env.DB_URL);
const usersDb = nanoInstance.db.use("plains_users");

// const game = require("./game/Game");

const initPassport = require("./initPassport.js");
initPassport(
	passport,
	(email) => {
		console.log("Getting email: " + email + " ...");
		var doc = usersDb.get(email);
		return doc;
	},
	(id) => {
		return users.find((user) => user.id === id);
	}
);

// Init app
const app = express();

const users = [];

// const mailer = new Mailer();
// mailer.test();
// Mailer.sendActivationEmail("a@b.com", "qwerty123").catch(error => console.log(error));

// app.set("game", game);
app.set("view-engine", "ejs");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	next();
});

app.use("/", require("./routes/rootApi"));

// Athentication not required
app.use("/news", require("./routes/newsApi"));
app.use("/clan", require("./routes/clanApi"));
app.use("/person", require("./routes/personApi"));
app.use("/user", require("./routes/userApi"));
app.use("/game", require("./routes/gameApi"));

app.listen(3000);
