var express = require('express');
var router = express.Router();

var controllers = require('../controllers/products.controller');

router.get('/', controllers.index);
router.get('/:id', controllers.getOne);
router.post('/', controllers.create);
router.put('/:id', controllers.replace);
router.patch('/:id', controllers.update);
router.delete('/:id', controllers.delete);

module.exports = router;