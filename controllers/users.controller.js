var md5 = require('md5');

var db = require('../db');
var shortid = require('shortid');

var users = db.get('users').value();

//  Index
module.exports.index = function(req, res) {
	var user = db.get('users').find({ id: req.signedCookies.userId }).value();
	res.render('users/index', {
		users: users,
		userName: user.name
	});
};

// Create
module.exports.create = function(req, res) {
	res.render('users/create')
};
module.exports.postCreate = function(req, res) {
	req.body.id = shortid.generate();
	req.body.password = md5(req.body.password);
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');
	db.get('users').push(req.body).write();
	res.redirect('/users');
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