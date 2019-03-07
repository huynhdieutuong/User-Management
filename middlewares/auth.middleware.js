var User = require('../models/user.model');

module.exports.requireAuth = async function(req, res, next) {
	if (!req.signedCookies.userId) {
		res.redirect('/auth/login')
		return;
	}
	var userId = req.signedCookies.userId;

	var user = await User.findById(userId);

	if (!user) {
		res.redirect('/auth/login')
		return;
	}
	next();
};

module.exports.hadCookie = async function(req, res, next) {
	var userId = req.signedCookies.userId;

	var user = await User.findById(userId);
	
	if (user) {
		res.redirect('/users')
		return;
	}
	next();
}