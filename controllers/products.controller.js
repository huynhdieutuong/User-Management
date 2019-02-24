var db = require('../db');

module.exports.index = function(req, res, next) {

	// Show products
	var page = parseInt(req.query.page);
	var perPage = 8;

	var drop = (page - 1) * perPage;

	// Show pagination
	var totalProducts = db.get('products').value().length;
	var totalPages = Math.ceil(totalProducts / perPage);

	var pagesPerPagi = 3;
	var totalPagis = Math.ceil(totalPages / pagesPerPagi);

	// Get [[1,2,3], [4,5,6], ...]
	var arrs = [];
	for (var i = 1; i <= totalPages; i = i + pagesPerPagi) {
		var arr = [];
		for (var n = i; n < i + pagesPerPagi; n++) {
			if (n === totalPages + 1) {
			  	break;
			}
			arr.push(n);
		}
		arrs.push(arr);
	}

	// Get arrs[x] to show, ex: arrs[0] = [1,2,3]
	if (page <= 0 || !page) {
		page = 1;
	}
	if (page > totalPages) {
		page = totalPages;
	}
	var x = 0;
	for (var y = 0; y <= totalPagis; y++) {
	  if ((arrs[y][0] === page) || (arrs[y][1] === page) || (arrs[y][2] === page)) {
	    x = y;
	    break;
	  };
	};

	// Render index
	res.render('products/index', {
		products: db.get('products').drop(drop).take(perPage).value(),
		arrs: arrs,
		x: x,
		totalPagis: totalPagis,
		page: page
	});
}