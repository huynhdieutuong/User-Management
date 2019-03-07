var Transfer = require('../models/transfer.model');

module.exports.create = function(req, res, next) {
	res.render('transfer/create', {
		csrfToken: req.csrfToken()
	});
}

module.exports.postCreate = async function(req, res, next) {
	var transfer = await Transfer.create({
		accountId: req.body.accountId,
		amount: req.body.amount,
		userId: req.signedCookies.userId		
	});

	res.redirect('/transfer/create');
}