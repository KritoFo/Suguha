const express = require('express');
const router = express.Router();
const pool = require('../database.js');

//Agregar Clientes
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
    res.redirect('/links');
});

//Vista Tabla Clientes
router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM clientes');
    res.render('links/list', { links });
});

    //Eliminar Cliente Tabla
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM clientes WHERE ID = ?', [id]);
    res.redirect('/links');
});

    //Editar Cliente Tabla
router.get('/edit/:id', async (req,res) => {
    const { id } = req.params;
    const readCliente = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    res.render('links/edit', { readCliente: readCliente[0] });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, identificacion, email, password, direccion, telefono } = req.body;
    const newCliente = {
        nombre,
        identificacion,
        email,
        password,
        direccion,
        telefono
    };
    await pool.query('UPDATE clientes set ? WHERE id = ?', [newCliente, id]);
    res.send('Vista Home')
});

//Eliminar Cliente Form
router.get('/delete1/:id', async (req, res) => {
    const { id } = req.params;
    /*await pool.query('DELETE FROM clientes WHERE ID = ?', [id]);*/
    res.render('links/add')
});


module.exports = router;