const express = require('express');
const router = express.Router();

const nano = require("nano")(process.env.DB_URL);
const mainDb = nano.db.use("plains");

router.get("/:clanId", (req, res, next) => {
	console.log("/clan/", req.params["clanId"]);

	mainDb.get(req.params["clanId"]).then((body) => {
		return res.send(body);
	  }).catch((error) => {
		return res.send(error);
	  });
});

router.get("/:clanId/members", (req, res, next) => {
	console.log("/clan/", req.params["clanId"] + "/members");

	mainDb.view("members", "clanMembers", {
		"keys": [req.params["clanId"]],
		"descending": true
	  }).then((body) => {
		return res.send(body.rows.map(r => {
			r.value["sex"] = r.value["male"]? "male" : "female";
			delete r.value["male"];
			return r.value;
		}));
	  }).catch((error) => {
		return res.error(error);
	  });
});

router.get("/:clanId/vehicles", (req, res, next) => {
	console.log("/clan/", req.params["clanId"] + "/vehicles");

	mainDb.view("vehicles", "clanVehicles", {
		"keys": [req.params["clanId"]],
		"descending": true
	  }).then((body) => {
		return res.send(body.rows.map(r => r.value));
	  }).catch((error) => {
		return res.send(error);
	  });
});

module.exports = router;