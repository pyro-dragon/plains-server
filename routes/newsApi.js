const express = require('express');
const router = express.Router();

const nano = require("nano")(process.env.DB_URL);
const newsDb = nano.db.use("plains_news");

router.get("/latest", (req, res, next) => {
	console.log("/news/latest");

	newsDb.view("news", "latest-news", {
		"include_docs": true,
		"descending": true,
		"limit": 1
	  }).then((body) => {
		return res.send(body.rows[0]);
	  }).catch((error) => {
		return res.send(error);
	  });
});

module.exports = router;