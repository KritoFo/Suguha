const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth.js');
const pool = require('../database.js');

router.get('/singup', isNotLoggedIn, (rep, res) => {
    res.render('auth/singup')
});

router.post('/singup', passport.authenticate('local.singup', {
        successRedirect: '/home',
        failureRedirect: '/singup',
        failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    }) (req, res, next);
});

router.get('/profile', isLoggedIn, async (req, res) => {
    res.render('auth/profile');
});

router.post('/profile', async (req, res) => {
    const { id_clientes } = req.user;
    const { nombre, identificacion, email, password, direccion, telefono } = req.body;
    const newCliente = {
        nombre,
        identificacion,
        email,
        password,
        direccion,
        telefono
    };
    await pool.query('UPDATE clientes set ? WHERE id_clientes = ?', [newCliente, id_clientes]);
    req.flash('success', 'Usuario actualizado correctamente');
    res.redirect('/profile');
});

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/signin');
    });
});

module.exports = router;