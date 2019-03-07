require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var csurf = require('csurf');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

var usersRoute = require('./routes/users.route');
var authRoute = require('./routes/auth.route');
var productsRoute = require('./routes/products.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

var sessionMiddleware = require('./middlewares/session.middleware');
var middleware = require('./middlewares/auth.middleware');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(sessionMiddleware);
app.use('/users', usersRoute);
app.use('/auth', middleware.hadCookie, authRoute);
app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/transfer', csurf({ cookie: true }), middleware.requireAuth, transferRoute);

app.use(express.static('public'));

var port = 4000;
app.listen(port, function() {
	console.log('Example app listening on port ' + port)
});