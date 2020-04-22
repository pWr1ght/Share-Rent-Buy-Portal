if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const mysql = require('./modules/dbcon.js');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});
const initializePassport = require('./passport-config')
const mngUsers = require('./modules/users.js');

//add dotenv functionality
require('dotenv').config();

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('public')); //Allow use of static files
app.set('view engine', 'handlebars'); //Use Handlebars templates
app.set('port', process.env.PORT || process.argv[2] || 3344); //Accept port from the commandline
app.set('mysql', mysql); //Use MySql DB engine
app.use(express.static(path.join(__dirname, '/public'))); //Specify static files routes
app.use(express.static(path.join(__dirname, '/uploads')));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// Load users from the data base for authenticaion and store them in the users variable
var users = [];
(() =>{ 
  function initUsers(result){
    users = JSON.parse(result);
  }
  mngUsers.data.getUsers(initUsers);
})();

// Used in authentication
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);
app.use(passport.initialize())
app.use(passport.session()) 
app.use(methodOverride('_method')) // Allows use of action="/logout?_method=DELETE" method="POST" in logout form

//Specify routes
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  function complete(input) {
    users.push(input);
    res.render('login')
  }
  mngUsers.data.registerUser(req, res, mysql, complete);
})

app.delete('/logout', checkAuthenticated, (req, res) => {
  req.logOut()
  res.redirect('/login')
})

app.use('/locate', require('./routes/locate.js'));
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

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

//Server
app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
