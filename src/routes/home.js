const express = require('express');
const router = express.Router();

router.get('/home', (rep, res) => {
    res.render('auth/home')
});

module.exports = router;