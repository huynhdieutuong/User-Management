var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var port = 4000;

var usersRoute = require('./routes/users.route');
var authRoute = require('./routes/auth.route');

var middleware = require('./middlewares/auth.middleware');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());

app.use('/users', middleware.requireAuth, usersRoute);
app.use('/auth', middleware.hadCookie, authRoute);

app.use(express.static('public'));

app.listen(port, function() {
	console.log('Example app listening on port ' + port)
});