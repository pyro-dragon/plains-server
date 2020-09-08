//req.app.get('game')
const express = require("express");
const router = express.Router();

const nano = require("nano")(process.env.DB_URL);
const mainDb = nano.db.use("plains");

router.get("/availableActions", (req, res, next) => {
	console.log("/availableActions");

	res.send(res.app.get("game").actionList);
});

module.exports = router;
