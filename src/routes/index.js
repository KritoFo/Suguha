const express = require('express');
const router = express.Router();
const { articulos } = require('../public/js/products');

router.get('/', (req, res) => {
    res.render('/home');
});

router.get('/products', (req, res) => {
    res.render('auth/products', { articulos });
});

module.exports = router;