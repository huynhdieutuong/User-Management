var express = require('express');
var router = express.Router();

var controllers = require('../controllers/users.controller');

// Index
router.get('/', controllers.index);

// Create
router.get('/create', controllers.create);
router.post('/create', controllers.postCreate);

// Search
router.get('/search', controllers.search);

// View
router.get('/:id', controllers.view);

module.exports = router;