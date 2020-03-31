const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

const app = express();
const port = 3000;

app.engine( 'hbs', exphbs({
  extname: 'hbs', 
  defaultView: 'main', 
  layoutsDir: path.join(__dirname, '/views/layouts'), 
  partialsDir: path.join(__dirname, '/views/partials'), 

  helpers: {
    cap: function(text) { return text.toUpperCase(); },
    em: function(text) {
      var x = `<em>${text}</em>`;
      return new handlebars.SafeString(x);
    }
  }
}));

app.set('view engine', 'hbs');

// Login route
app.get('/login', function(req, res) {
  res.render('login')
});

// Register route
app.get('/register', function(req, res) {
  res.render('register')
});

// Home route
app.get('/', function(req, res) {
    res.render('home')
});

//Weight route
app.get('/weight', function(req, res) {
  res.render('weight')
});

//BMI route
app.get('/bmi', function(req, res) {
  res.render('bmi')
});

//Body Fat route
app.get('/bodyfat', function(req, res) {
  res.render('bodyfat')
});

//About route
app.get('/about', function(req, res) {
  res.render('about')
});

//Account route
app.get('/account', function(req, res) {
  res.render('account')
});

app.use(express.static('public'));

app.listen(port, function() {
  console.log('App listening at port '  + port)
});
