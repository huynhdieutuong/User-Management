var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 4000;

var usersRoute = require('./routes/users.route');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/users', usersRoute);

app.use(express.static('public'));

app.listen(port, function() {
	console.log('Example app listening on port ' + port)
});