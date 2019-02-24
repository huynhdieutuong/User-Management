var db = require('../db');

module.exports.requireAuth = function(req, res, next) {
	if (!req.signedCookies.userId) {
		res.redirect('/auth/login')
		return;
	}

	var user = db.get('users').find({ id: req.signedCookies.userId }).value();

	if (!user) {
		res.redirect('/auth/login')
		return;
	}
	next();
};

module.exports.hadCookie = function(req, res, next) {
	var user = db.get('users').find({ id: req.signedCookies.userId }).value();
	
	if (user) {
		res.redirect('/users')
		return;
	}
	next();
}