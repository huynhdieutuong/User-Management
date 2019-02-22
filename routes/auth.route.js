var express = require('express');
var router = express.Router();

var controllers = require('../controllers/auth.controller');

// Login
router.get('/login', controllers.login);
router.post('/login', controllers.postLogin);

module.exports = router;