const express = require('express');
const router = express.Router();

const nano = require("nano")(process.env.DB_URL);
const mainDb = nano.db.use("plains");

router.get("/:personId", (req, res, next) => {
	console.log("/person/", req.params["personId"]);

	mainDb.get(req.params["personId"]).then((body) => {
		body["sex"] = body["male"]? "male" : "female";
		delete body["male"];
		return res.send(body);
	  }).catch((error) => {
		return res.send(error);
	  });
});

module.exports = router;