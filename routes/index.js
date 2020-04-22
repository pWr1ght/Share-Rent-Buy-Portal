const express = require('express');
const router = express.Router();

router.use('/', require('./home.js'));
router.use('/addItem', require('./addItem.js'));

module.exports = router;
