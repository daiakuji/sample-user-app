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
	// Gets the list of active users
	getUserList: function(success,fail){
		db.query("select * from users where active=$1 order by id", true)
		.then(success,fail);
	},
	
	// Gets a single user
	getUser: function(id, success, fail){
	db.query("select * from users where id=$1", id)
		.then(success,fail)
	},

	// Adds a single user
	addUser: function(body, success, fail){
		db.tx(function (t) {
			return promise.all([
				// Insert the data and return an id
				t.one("insert into users(login, active) values($1, $2) returning id",
						[body.login, true])				//,
				// Set an audit row
				//t.none("insert into audit(status, id) values($1, $2)",
				//    ['active', 123])
			]);
		})
		/*db.one("insert into users(login, active) values($1, $2) returning id",
				[body.login, true])*/
		.then(success, fail);	
	},

	// Updates a single user
	updateUser: function(id, body, success, fail){		
		db.tx(function (t) {
			return promise.all([
				// Update the data
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

	// Deletes a single user
	deleteUser: function(id, success, fail){
		db.tx(function (t) {
		// t = this
		return promise.all([
			// Hard Delete
			//t.none("DELETE FROM users WHERE id = $1", id)
			//
			// Soft Delete
			t.none("update users set active=$1 where id=$2", [false, id]),
			// Set an audit row
			//t.none("insert into audit(status, id) values($1, $2)",
			//	['active', 123])
		]);
	})
		.then(success,fail);
	},

	// Test function to increment a value in db module
	increment: function() {
		count++;
	},

	// Test function to return a value from the db module
	getCount: function() {
		return count;
	}	
};