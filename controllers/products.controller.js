var db = require('../db');
var lodash = require('lodash');

var products = db.get('products').value();

module.exports.index = function(req, res, next) {
	
	// Show products
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;

	var drop = (page - 1) * perPage;


	// Show pagination
	var totalPages = Math.ceil(products.length / perPage);
	
	if(page > 1) {
	var firstPage = page - 1;
	}
	
	if(page < totalPages) {
	var endPage = page + 1;
	}

	// Render
	res.render('products/index', {
		products: db.get('products').drop(drop).take(perPage).value(),
		page: page,
	    firstPage: firstPage,
	    endPage: endPage
	})
}