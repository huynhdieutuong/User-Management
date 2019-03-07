var Session = require('../models/session.model');

module.exports = async function(req, res, next) {
	var sessionId = req.signedCookies.sessionId;
	if (!sessionId) {
		var session = await Session.create({
			cart: {}
		});

		res.cookie('sessionId', session.id, { signed: true });
	};

	// Show numbers of products added to cart
	var session = await Session.findById(sessionId);
	var numbers = 0;

	if(session) {
		var cart = session.cart;
		for (var product in cart) {
			numbers += cart[product];
		}
	}

	res.locals.numbers = numbers;

	next();
};