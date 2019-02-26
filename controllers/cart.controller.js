var db = require('../db');

module.exports.cart = function(req, res, next) {
	var sessionId = req.signedCookies.sessionId;
	var productId = req.params.productId;
	
	var count = db.get('sessions')
					.find({ id: sessionId})
					.get('cart.' + productId, 0)
					.value();

	db.get('sessions')
		.find({ id: sessionId})
		.set('cart.' + productId, count + 1)
		.write();

	res.redirect('/products');

}