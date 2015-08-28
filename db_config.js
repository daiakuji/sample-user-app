module.exports = {
    host: 'localhost',  // server name or IP address;
    port: 5432,         // default port;
    database: 'pg_promise_test', // local database name for testing;
    user: 'postgres',    // user name;
    password: '', // add password, if needed;
	poolSize: 10,	//number of connections to use in connection pool
	poolIdleTimeout: 30000,   //max milliseconds a client can go unused before it is removed
	reapIntervalMillis: 1000,	  //frequeny to check for idle clients within the client pool
	ssl: false,
}