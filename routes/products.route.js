var express = require('express');
var router = express.Router();

var controllers = require('../controllers/products.controller');

router.get('/', controllers.index);

module.exports = router;