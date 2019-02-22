var db = require('../db');

// Login
module.exports.login = function(req, res) {
	res.render('auth/login')
};
module.exports.postLogin = function(req, res) {
	var user = db.get('users').find({ email: req.body.email }).value();
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

	if(user.password !== password) {
		res.render('auth/login', {
			errors: [ 'Wrong password' ],
			values: req.body	
		})
		return;		
	}
	
	res.cookie('userId', user.id);
	res.redirect('/users');

};