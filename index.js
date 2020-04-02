const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');

const mongodb = require('mongodb');
const mongoose = require('mongoose');

const mongoClient = mongodb.MongoClient;
const databaseURL = "mongodb+srv://admin:admin@weightmate-onmru.mongodb.net/WeightMateDb?retryWrites=true&w=majority";
const dbName= "WeightMateDb";

const app = express();
const port = 3000;

 mongoose.connect(databaseURL, {useNewUrlParser: true, useUnifiedTopology: true })
 .then(()=>console.log('Connected to database..'))
 .catch(err => console.error(err));  

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

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));

// const UserControl = require('./controllers/UserControl');

app.set('view engine', 'hbs');

// Login route
app.get('/', function(req, res) {
  res.render('login')
});

// Register route
app.get('/register', function(req, res) {
  res.render('register')
});
// app.post('/api/register/create', UserControl.create);
// app.post('/api/register/update', UserControl.update);
// app.get('/api/register/retrieve', UserControl.retrieve);
// app.delete('/api/register/delete', UserControl.delete);


// Home route
app.get('/home', function(req, res) {
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

app.listen(port, function() {
  console.log('App listening at port '  + port)
});
