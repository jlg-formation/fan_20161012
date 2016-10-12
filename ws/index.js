var express = require('express');
var router = express.Router();

router.get('/now', function(req, res) {
	res.json({now: new Date(), hello: 'world'});
});

router.get('/s1', function(req, res) {
	setTimeout(function() {
		res.json({result: 's1', titi: 'toto'});
	}, 200);
});

router.get('/s2', function(req, res) {
	setTimeout(function() {
		res.json({result: 's2'});
	}, 2000);
});

router.get('/s3', function(req, res) {
	setTimeout(function() {
		res.json({result: 's3'});
	}, 4000);
});

router.get('/s4', function(req, res) {
	setTimeout(function() {
		res.json({result: 's4'});
	}, 1000);
});

router.get('/s5', function(req, res) {
	setTimeout(function() {
		res.json({result: 's5'});
	}, 3000);
});


module.exports = router;
