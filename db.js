'use strict';

// Loading and initializing the library without options;
// See also: https://github.com/vitaly-t/pg-promise#initialization-options
var pgp = require('pg-promise')(/*options*/);
var promise = require('bluebird'); 
var config = require('./db_config');

// Database connection details;
var cn = {
    host: config.host,  // server name or IP address;
    port: config.port,         // default port;
    database: config.database, // local database name for testing;
    user: config.user,    // user name;
    password: config.password, // add password, if needed;
	poolSize: config.poolSize,	//number of connections to use in connection pool
	poolIdleTimeout: config.poolIdleTimeout,   //max milliseconds a client can go unused before it is removed
	reapIntervalMillis: config.reapIntervalMillis	  //frequeny to check for idle clients within the client pool

};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js

var db = pgp(cn); // database instance;

var count = 1;

module.exports = {
	getUserList: function(success,fail){
		console.log(cn);
	db.query("select * from users where active=$1", true)
		.then(success,fail);
	},

	getUser: function(id, success, fail){
	db.query("select * from users where id=$1", id)
		.then(success,fail)
	},

	addUser: function(body, success, fail){
		db.one("insert into users(login, active) values($1, $2) returning id",
			[body.login, true])
			.then(success,fail);
	},

	updateUser: function(id, body, success, fail){
		db.tx(function (t) {
		return promise.all([
			t.none("update users set login=$1 where id=$2",
				[body.login, id])
			//,
			// Set an audit row
			//t.none("insert into audit(status, id) values($1, $2)",
			//    ['active', 123])
		]);
	})
		.then(success,fail);
	},

	deleteUser: function(id, body, success, fail){
		db.tx(function (t) {
		// t = this
		return promise.all([
			t.none("DELETE FROM users WHERE id = $1", id)
			//,
			// Set an audit row
			//t.none("insert into audit(status, id) values($1, $2)",
			//	['active', 123])
		]);
	})
		.then(function (data) {
			// success;
		}, function (reason) {
			// error;
		});
	},

	increment: function() {
		count++;
	},

	getCount: function() {
		return count;
	}	
};