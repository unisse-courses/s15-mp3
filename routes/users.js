const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const UserControl = require('../controllers/UserControl');

function calculate_age(date) { 
    var diff_ms = Date.now() - date;
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

router.get('/home', ensureAuthenticated,(req, res) => 
    res.render('home', {
        username: req.user.username 
    }));

router.get('/weight', ensureAuthenticated, function(req, res){
    res.render('weight', {
        encodedweight : encodeURIComponent(JSON.stringify(req.user.weights)),
        age: calculate_age(req.user.birthdate),
        sex: req.user.sex,
        heightfeet: req.user.heightfeet,
        heightinch: req.user.heightinch,
    })
  }
);

router.get('/bmi', ensureAuthenticated, function(req, res){
    res.render('bmi', {
        encodedBMI : encodeURIComponent(JSON.stringify(req.user.BMIs)),
        heightfeet: req.user.heightfeet,
        heightinch: req.user.heightinch,
    })
  }
);

router.get('/bodyfat', ensureAuthenticated, function(req, res){
    res.render('bodyfat', {
        encodedBFP : encodeURIComponent(JSON.stringify(req.user.BFPs)),
        age: calculate_age(req.user.birthdate),
        sex: req.user.sex,
        heightfeet: req.user.heightfeet,
        heightinch: req.user.heightinch,
    })
  }
);

router.get('/about', ensureAuthenticated,(req, res) => res.render('about'));


router.get('/account', ensureAuthenticated,(req, res) => res.render('account', {
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    heightfeet: req.user.heightfeet,
    heightinch: req.user.heightinch,
    sex: req.user.sex,
    country: req.user.country,
    email: req.user.email,
    username: req.user.username,
    password: req.user.password,
    weights: req.user.weights,
    BMIs: req.user.BMIs,
    BFPs: req.user.BFPs
}));

router.get('/deleteaccount', ensureAuthenticated, UserControl.deleteaccount);

module.exports=router;

