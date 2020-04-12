var express = require('express');
var mysql = require('./modules/dbcon.js');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var handlebars = require('express-handlebars').create({
	defaultLayout: 'main'
});

// configure the app to use bodyParser()
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('public')); //Allow use of static files
app.set('view engine', 'handlebars'); //Use Handlebars templates
app.set('port', process.env.PORT || process.argv[2] || 3344); //Accept port from the commandline
app.set('mysql', mysql); //Use MySql DB engine
app.use(express.static(path.join(__dirname, '/public'))); //Specify static files routes
app.use(express.static(path.join(__dirname, '/uploads')));

//Specify routes

app.use('/', require('./routes/home.js'));

//Go here when 404
app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

//Go here when 500 error
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

//Server
app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
