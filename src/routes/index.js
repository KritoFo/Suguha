const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('links/add');
});

module.exports = router;