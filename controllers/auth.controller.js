var md5 = require('md5');

var User = require('../models/user.model');

// Login
module.exports.login = function(req, res) {
	res.render('auth/login')
};
module.exports.postLogin = async function(req, res) {
	var user = await User.findOne({ email: req.body.email });

	var password = req.body.password;

	if(!req.body.email) {
		res.render('auth/login', {
			errors: [ 'Email is required.' ],
			values: req.body
		})
		return;
	}

	if(!req.body.password) {
		res.render('auth/login', {
			errors: [ 'Password is required.' ],
			values: req.body
		})
		return;
	}

	if(!user) {
		res.render('auth/login', {
			errors: [ 'Email does not exist' ],
			values: req.body
		})
		return;
	};

	if(user.password !== md5(password)) {
		res.render('auth/login', {
			errors: [ 'Wrong password' ],
			values: req.body	
		})
		return;		
	}
	
	res.cookie('userId', user.id, { signed: true });
	res.redirect('/users');

};