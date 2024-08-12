const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/singup', (rep, res) => {
    res.render('auth/singup')
});

router.post('/singup', passport.authenticate('local.singup', {
        successRedirect: '/profile',
        failureRedirect: '/singup',
        failureFlash: true
}));

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', (req, res) => {
    res.send('Profile');
});

module.exports = router;