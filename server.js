'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = require('./config/express')(db);



// Bootstrap passport config
require('./config/passport')();

//openshift port or local port
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port1 = process.env.OPENSHIFT_NODEJS_PORT ||3000;
 
app.listen(port1, ipaddress);
console.log('MEAN.JS application started on port ' +port1);
// Start the app by listening on <port>
//app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
//console.log('MEAN.JS application started on port ' + config.port);