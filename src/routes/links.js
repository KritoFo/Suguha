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
    req.flash('success', 'Usuario creado correctamente');
    res.redirect('/links');
});

//Vista Tabla Clientes
router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM clientes');
    res.render('links/list', { links });
});

    //Eliminar Cliente Tabla
router.get('/delete/:id_clientes', async (req, res) => {
    const { id_clientes } = req.params;
    await pool.query('DELETE FROM clientes WHERE id_clientes = ?', [id_clientes]);
    req.flash('success', 'Usuario elimminado correctamente')
    res.redirect('/links');
});

    //Editar Cliente Tabla
router.get('/edit/:id_clientes', async (req,res) => {
    const { id_clientes } = req.params;
    const readCliente = await pool.query('SELECT * FROM clientes WHERE id_clientes = ?', [id_clientes]);
    res.render('links/edit', { readCliente: readCliente[0] });
});

router.post('/edit/:id_clientes', async (req, res) => {
    const { id_clientes } = req.params;
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
    req.flash('success', 'Usuario actualizado correctamente')
    res.redirect(id_clientes)
});

//Eliminar Cliente Form
router.get('/delete1/:id_clientes', async (req, res) => {
    const { id_clientes } = req.params;
    /*await pool.query('DELETE FROM clientes WHERE id_clientes = ?', [id_clientes]);*/
    res.render('links/add')
});


module.exports = router;