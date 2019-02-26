var shortid = require('shortid');
var db = require('../db');

module.exports = function(req, res, next) {
	if (!req.signedCookies.sessionId) {
		var sessionId = shortid.generate();
		res.cookie('sessionId', sessionId, { signed: true });
		db.get('sessions').push({ id: sessionId }).write();
	};

	// Show numbers of products added to cart
	var cart = db.get('sessions')
		.find({ id: req.signedCookies.sessionId })
		.get('cart')
		.value();

	var numbers = 0;
	for (var product in cart) {
		numbers += cart[product];
	}

	res.locals.numbers = numbers;

	next();
};