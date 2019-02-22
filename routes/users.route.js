var express = require('express');
var router = express.Router();

var controllers = require('../controllers/users.controller');
var validate = require('../validate/users.validate');

// Index
router.get('/', controllers.index);

// Create
router.get('/create', controllers.create);
router.post('/create', validate.postCreate, controllers.postCreate);

// Search
router.get('/search', controllers.search);

// View
router.get('/:id', controllers.view);

module.exports = router;