const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('/home');
});

router.get('/products', (req, res) => {
    res.render('auth/products');
});

module.exports = router;