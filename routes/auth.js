var express = require('express');
const storage = require('../storage/VirtualStorageLayer');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

	storage.authenticateUser(req.body.username, req.body.password);
});

module.exports = router;
