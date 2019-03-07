var md5 = require('md5');

var User = require('../models/user.model');

//  Index
module.exports.index = async function(req, res) {
	var userId = req.signedCookies.userId;

	var user = await User.findById(userId);
	var users = await User.find();

	res.render('users/index', {
		users: users,
		userName: user.name
	});
};

// Create
module.exports.create = function(req, res) {
	res.render('users/create')
};
module.exports.postCreate = async function(req, res) {
	var newUser = await User.create({
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		password: md5(req.body.password),
		avatar: req.file.path.split('\\').slice(1).join('/')
	});
	res.redirect('/users');
};

// Search
module.exports.search = async function(req, res) {
	var users = await User.find();
	var filteredUser = users.filter(function(user) {
		return user.name.toLowerCase().indexOf(req.query.q.toLowerCase()) !== -1;
	});
	res.render('users/index', {
		users: filteredUser,
		xxx: req.query.q
	});
};

// View
module.exports.view = async function(req, res) {
	var id = req.params.id;
	var user = await User.findById(id);
	res.render('users/view', {
		user: user
	});
};