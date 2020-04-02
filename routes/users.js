const express = require('express');
const router = express.Router();
const { ensureAuthenticated} = require('../config/auth');

router.get('/home', ensureAuthenticated,(req, res) => 
    res.render('home', {
        username: req.user.username 
    }));



router.get('/weight', ensureAuthenticated,(req, res) => res.render('weight'));
router.get('/bmi', ensureAuthenticated,(req, res) => res.render('bmi'));
router.get('/bodyfat', ensureAuthenticated,(req, res) => res.render('bodyfat'));
router.get('/about', ensureAuthenticated,(req, res) => res.render('about'));
router.get('/account', ensureAuthenticated,(req, res) => res.render('account'));

module.exports=router;