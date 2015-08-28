Sample App
===========

Basic application to view a list of users and add/modify/delete users

---

* Uses [Express](http://expressjs.com/), [Postgres](http://www.postgresql.org/), [node-postgres](https://github.com/brianc/node-postgres) and [pg-promise] (https://github.com/vitaly-t/pg-promise)
* Uses [Jade](http://jade-lang.com/) template
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

* Install nodemon 

```
$ npm install -g nodemon
```
And modify the package.json from 
```
  "scripts": {
    "start": "node ./bin/www"
```
to
```
  "scripts": {
    "start": "nodemon ./bin/www"
```

# Configuration
To change the configuration for the Postgres database connection, modify the db_config.js.
[Additional options for postgres](https://github.com/brianc/node-postgres/blob/master/lib/defaults.js)

Ensure the changes are made when [setting up the test database] (https://github.com/vitaly-t/pg-promise/blob/master/README.md#testing)

# Start Up
Run the following command in the application folder
```
$ npm start
```