var express= require('express');
var router = express.Router();

var controllers = require('../controllers/cart.controller');

router.get('/add/:productId', controllers.cart);

module.exports = router;