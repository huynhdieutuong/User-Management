var shortid = require('shortid');

var db = require('../db');

module.exports.create = function(req, res, next) {
	res.render('transfer/create', {
		csrfToken: req.csrfToken()
	});
}

module.exports.postCreate = function(req, res, next) {
	var data = {
		id: shortid.generate(),
		accountId: req.body.accountId,
		amount: parseInt(req.body.amount),
		userId: req.signedCookies.userId
	}

	db.get('transfer').push(data).write();

	res.redirect('/transfer/create');
}