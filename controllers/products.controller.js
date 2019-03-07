var lodash = require('lodash');

var Product = require('../models/product.model');

module.exports.index = async function(req, res, next) {
	var products = await Product.find();
	
	// Show products
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;

	var drop = (page - 1) * perPage;
	var start = lodash.drop(products, drop);

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
		products: lodash.take(start, perPage),
		page: page,
	    firstPage: firstPage,
	    endPage: endPage
	})
}