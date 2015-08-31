//Load Dependencies
var express = require('express');
var router = express.Router();
var dbreq = require('../db');

/* GET users listing. */
router.route("/test")
	.get(function(req, res) {
	dbreq.increment();
	results = dbreq.getCount();
	res.json(results);
	
});

/* GET users listing. */
router.route("/list")
	.get(function(req, res) {
	dbreq.getUserList(function(data) {
		res.render('userlist', {
			"userlist" : data
		});
	}, function(reason) {
		res.json({ errors: [reason] }).status(503);
	});	
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
	res.render('newuser', { title: 'Add New User' });
});

  
/* POST to Add User Service */
router.post('/adduser', function(req, res) {
	dbreq.addUser(req.body,function(data) {
		res.redirect("/users/"+data[0].id);
	}, function (reason) {
		res.json({ errors: [reason] }).status(503);	
	});
});

/* GET user by ID. Note: Causes a 503 error if moved */
router.route("/:id")
	.get(function(req, res) {
		dbreq.getUser(req.params.id,function(data) {
			if (data[0] != null) {
				res.render('user', {
					"id"	:	data[0].id,
					"login"	:	data[0].login
				});
			}
			else
			{
				res.redirect("/users/list");
			}
		}, function(reason) {
			console.log(reason);
			//res.json({ errors: [reason] }).status(503);
			res.redirect("/users/list");
		});
	})
	/* POST to Update User Service - Uses input type hidden, value put in the Jade*/
	.put(function(req, res) {
		dbreq.updateUser(req.params.id, req.body, function(data) {
			res.redirect("/users/"+req.params.id);
		}, function(reason) {
			console.log(reason);
			//res.json({ errors: [reason] }).status(503);
			res.redirect("/users/list");
		});
	})
	/* DELETE to Delete User Service*/
	.delete(function(req, res) {
		console.log(req.params.id);
		dbreq.deleteUser(req.params.id, function() {
			res.redirect("/users/list");
		}, function(reason) {
			console.log(reason);
			//res.json({ errors: [reason] }).status(503);
			res.redirect("/users/list");
		});
	});	

module.exports = router;