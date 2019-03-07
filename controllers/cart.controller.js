var Session = require('../models/session.model');

module.exports.cart = async function(req, res, next) {
	var sessionId = req.signedCookies.sessionId;
	var productId = req.params.productId;
	
	var session = await Session.findById(sessionId);

	var cart = session.cart;
	if(!cart) {
		cart = {};
		cart[productId] = 1;
	} else if(!cart[productId]) {
		cart[productId] = 1;
	} else {
		cart[productId] += 1;
	}

	await Session.findByIdAndUpdate(sessionId, {
		cart: cart
	});

	res.redirect('/products');

}