const express = require('express');
const router = express.Router();

const pool = require('../database.js');

router.get('/add', (req, res) => {
    res.render('links/add')
});

router.post('/add', async (req, res) => {
    const { nombre, identificacion, email, password, direccion, telefono } = req.body;
    const newCliente = {
        nombre,
        identificacion,
        email,
        password,
        direccion,
        telefono
    };
    await pool.query('INSERT INTO clientes set ?', [newCliente]);
    res.send('Recibido');
});

module.exports = router;