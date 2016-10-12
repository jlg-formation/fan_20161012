var express = require('express');
var router = express.Router();

router.get('/now', function(req, res) {
	res.json({now: new Date(), hello: 'world'});
});

module.exports = router;
