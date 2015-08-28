Sample App
===========

Basic application to view a list of users and add/modify/delete users

---

* Uses Express, Postgres and pg-promise
* Uses Jade template
* Basic CRUD operations

---

# Starting out 
```
$ npm install
```

# from scratch

* Set up Express
```
$ npm update -g express
$ npm install -g express-generator
$ express appname
```

* Install Postgres dependencies
```
$ npm install pg
$ npm install pg-promise
```

# Configuration
To change the configuration for the Postgres database connection, modify the db_config.js.
[Additional options for postgres](https://github.com/brianc/node-postgres/blob/master/lib/defaults.js)

Ensure the changes are made when [setting up the test database] (https://github.com/vitaly-t/pg-promise/blob/master/README.md#testing)