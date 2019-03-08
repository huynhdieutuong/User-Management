var lodash = require('lodash');

var Product = require('../../models/product.model');

module.exports.index = async function(req, res, next) {
	var products = await Product.find();
	res.json(products);
}

module.exports.getOne = async function(req, res, next) {
	var productId = req.params.id;
	var product = await Product.findById(productId);
	res.json(product);
}

module.exports.create = async function(req, res, next) {
	var product = await Product.create(req.body);
	res.json(product);
}

module.exports.replace = async function(req, res, next) {
	var productId = req.params.id;
	var product = await Product.findOneAndReplace( { _id: productId }, req.body);
	res.json(product);
}

module.exports.update = async function(req, res, next) {
	var productId = req.params.id;
	var product = await Product.findByIdAndUpdate(productId, req.body);
	res.json(product);
}

module.exports.delete = async function(req, res, next) {
	var productId = req.params.id;
	var product = await Product.findByIdAndDelete(productId);
	res.json(product);
}