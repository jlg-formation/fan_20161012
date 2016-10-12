(function() {
	'use strict';

	var express = require('express'); // charge ExpressJS
	var serveIndex = require('serve-index');
	
	var webservice = require('./ws/index.js');

	var app = express();
	
	app.use('/ws', webservice);
	
	app.use(express.static('./app'));
	app.use(serveIndex('./app', {icons: true}));
	
	app.all('/*', function(req, res) {
		res.sendFile('./app/index.html', { root: __dirname });
	});

	app.use(function(req, res, next) {
		console.log('404: Page not Found', req.url);
		next();
	});

	app.listen(8000, function() {
		console.log('server started on port 8000');
	});
})();
