var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ dest: './public/uploads/' });

var controllers = require('../controllers/users.controller');
var validate = require('../validate/users.validate');

var middleware = require('../middlewares/auth.middleware');

// Index
router.get('/', middleware.requireAuth, controllers.index);

// Create
router.get('/create', controllers.create);
router.post('/create', upload.single('avatar'), validate.postCreate, controllers.postCreate);

// Search
router.get('/search', middleware.requireAuth, controllers.search);

// View
router.get('/:id', middleware.requireAuth, controllers.view);

module.exports = router;