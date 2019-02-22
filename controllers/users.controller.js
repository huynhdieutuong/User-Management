var db = require('../db');
var shortid = require('shortid');

var users = db.get('users').value();

//  Index
module.exports.index = function(req, res) {
	res.render('users/index', {
		users: users
	});
};

// Create
module.exports.create = function(req, res) {
	res.render('users/create')
};
module.exports.postCreate = function(req, res) {
	req.body.id = shortid.generate()
	db.get('users').push(req.body).write()
	res.redirect('/users')
};

// Search
module.exports.search = function(req, res) {
	var filteredUser = users.filter(function(user) {
		return user.name.toLowerCase().indexOf(req.query.q.toLowerCase()) !== -1;
	});
	res.render('users/index', {
		users: filteredUser,
		xxx: req.query.q
	});
};

// View
module.exports.view = function(req, res) {
	var id = req.params.id;
	var user = db.get('users').find({ id: id }).value();
	res.render('users/view', {
		user: user
	});
};