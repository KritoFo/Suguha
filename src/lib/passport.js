const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM clientes WHERE email = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash('success', '¡Hola, disfruta navegando en nuestra web.'));
        } else {
            done(null, false, req.flash('message', 'Contraseña Incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'Usuario no encontrado'));
    }
}));

passport.use('local.singup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const { nombre, identificacion, direccion, telefono } = req.body;
    const newUser = {
        nombre,
        identificacion,
        email,
        password,
        direccion,
        telefono
    };
    newUser.password = await helpers.encryptPassword(password);
    
    const result = await pool.query('INSERT INTO clientes SET ?', [newUser]);
    newUser.id_clientes = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id_clientes);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM clientes WHERE id_clientes = ?', [id]);
    done(null, rows[0]);
});
